import React, { useState, useRef, useEffect } from "react";
import feedSteps from "./Feedrequirements";
import { Button } from "@heroui/react";
import Radiogroup from "./Radiogroup";
import Dropdown from "./dropdown";
import "./Managefeed.css";
import Textbox from "./textbox";
import Checkboxgroup from "./checkbox";
import DisplayCard from "./displaycard";
import MultiLineInput from "./MultiLineInput";
import DatePicker from "./DatePicker";
import HiddenForm from './HiddenformUS';
import DisplayCardSeries from "./DisplayCardSeries";
import { useLocation } from "react-router-dom";
import DynamicListbox from "./Listbox";
import { useAuth0 } from "@auth0/auth0-react";

const Card = () => {
    // Hooks must be called in the same order on every render.
    // Declare all hooks unconditionally at the top.
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const hiddenFormRef = useRef();
    const [, forceRerender] = useState(0);
    const location = useLocation();
    const auth0 = useAuth0();
    const [authLoading, setAuthLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Authentication check
    useEffect(() => {
        const controller = new AbortController();

        const ensureAuthenticated = async () => {
            try {
                setAuthLoading(true);
                const res = await fetch("/account/user", { credentials: "include", signal: controller.signal });

                if (res.status === 401) {
                    window.location.href = `/account/login?returnUrl=/Managefeed`;
                    return;
                }

                if (!res.ok) {
                    console.error("Failed to verify user:", res.status, res.statusText);
                    window.location.href = `/account/login?returnUrl=/Managefeed`;
                    return;
                }

                const json = await res.json();
                console.log("BFF user:", json);
                setIsAuthenticated(true);
            } catch (err) {
                console.error("Error verifying auth with BFF:", err);
                window.location.href = `/account/login?returnUrl=/Managefeed`;
                return;
            } finally {
                setAuthLoading(false);
            }
        };

        ensureAuthenticated();
        return () => controller.abort();
    }, []);

    // Initialize answers with default values from feedSteps
    useEffect(() => {
        const defaults = {};
        feedSteps.forEach(stepQuestions => {
            if (!Array.isArray(stepQuestions)) return;
            stepQuestions.forEach(q => {
                if (q.default !== undefined && q.name) {
                    defaults[q.name] = q.default;
                }
                if (q.type === "Combined" && Array.isArray(q.elements)) {
                    q.elements.forEach(el => {
                        if (el.default !== undefined && el.name) {
                            defaults[el.name] = el.default;
                        }
                    });
                }
            });
        });
        if (Object.keys(defaults).length > 0) {
            setAnswers(prev => ({ ...prev, ...defaults }));
        }
    }, []);

    // Apply editAnswers passed via navigation state
    useEffect(() => {
        const fast = location?.state?.editAnswers;
        if (fast && typeof fast === "object") {
            Object.entries(fast).forEach(([key, val]) => {
                updateAnswer(key, val);
            });
        }
        // NOTE: updateAnswer is defined below; useEffect runs after render so it's safe.
    }, [location?.state?.editAnswers]);

    // Load catco options
    useEffect(() => {
        const loadCatcoOptions = async () => {
            try {
                const API = "http://localhost:3000";
                const category = "catco";
                const res = await fetch(`${API}/api/options?category=${encodeURIComponent(category)}`);
                if (!res.ok) throw new Error("Network error");
                const data = await res.json();
                if (!Array.isArray(data) || data.length === 0) return;
                for (let i = 0; i < feedSteps.length; i++) {
                    const stepArr = feedSteps[i];
                    if (!Array.isArray(stepArr)) continue;
                    const q = stepArr.find(item => item && item.name === "catco");
                    if (q) {
                        q.values = data.map(d => ({ value: d.value || d.text, text: d.text }));
                        break;
                    }
                }
                forceRerender(n => n + 1);
            } catch (err) {
                console.error("Failed to load catco options:", err);
            }
        };
        loadCatcoOptions();
    }, []);

    // do not render feed until auth check completes
    if (authLoading) {
        return <div style={{ padding: 20 }}>Checking authentication...</div>;
    }
    if (!isAuthenticated) {
        return null;
    }

    // Helper: recursively clear dependent answers
    const clearDependentAnswers = (changedName, newAnswers, questions) => {
        questions.forEach(q => {
            if (q.dependency) {
                const dependencies = Array.isArray(q.dependency) ? q.dependency : [q.dependency];
                dependencies.forEach(dep => {
                    const [parent, value] = dep.split("-");
                    if (parent === changedName && newAnswers[parent] !== value && newAnswers[q.name] !== undefined) {
                        delete newAnswers[q.name];
                        clearDependentAnswers(q.name, newAnswers, questions);
                    }
                });
            }
            if (q.type === "Combined" && Array.isArray(q.elements)) {
                q.elements.forEach(el => {
                    if (el.dependency) {
                        const dependencies = Array.isArray(el.dependency) ? el.dependency : [el.dependency];
                        dependencies.forEach(dep => {
                            const [parent, value] = dep.split("-");
                            if (parent === changedName && newAnswers[parent] !== value && newAnswers[el.name] !== undefined) {
                                delete newAnswers[el.name];
                                clearDependentAnswers(el.name, newAnswers, questions);
                            }
                        });
                    }
                });
            }
        });
    };

    // Update answer and clear dependents if needed
    const updateAnswer = (name, selectedValue) => {
        setAnswers(prevAnswers => {
            const newAnswers = { ...prevAnswers, [name]: selectedValue };
            clearDependentAnswers(name, newAnswers, feedSteps.flat());
            console.log("Updated Answers:", newAnswers);
            return newAnswers;
        });
    };

    function checkDependencies(dependencyArr, answers) {
        if (!dependencyArr) return true;
        const deps = Array.isArray(dependencyArr) ? dependencyArr : [dependencyArr];
        const map = {};
        deps.forEach((dep) => {
            const [parent, value] = dep.split("-");
            if (!parent) return;
            map[parent] = map[parent] || [];
            map[parent].push(value);
        });
        return Object.keys(map).every((parent) => {
            const allowed = map[parent];
            const val = answers[parent];
            if (val == null) return false;
            if (Array.isArray(val)) {
                return allowed.some((a) => val.includes(a));
            }
            return allowed.some((a) => val === a);
        });
    }

    function getVisibleQuestions(stepIndex, answers) {
        const step = feedSteps[stepIndex] || [];
        const visible = step.flatMap((q) => {
            const parentOk = checkDependencies(q.dependency, answers) && checkDependencies(q.subdependency, answers);
            if (q.type === "Combined" && Array.isArray(q.elements)) {
                if (!parentOk) return [];
                return q.elements
                    .filter((el) => checkDependencies(el.dependency, answers) && checkDependencies(el.subdependency, answers))
                    .map((el) => ({ ...el, parentCombined: q }));
            }
            if (parentOk) return [q];
            return [];
        });
        return visible;
    }

    const visibleQuestions = getVisibleQuestions(step, answers);
    const nextStepQuestions = step < feedSteps.length - 1 ? getVisibleQuestions(step + 1, answers) : [];

    const findNextVisibleStep = (fromIndex, currentStep) => {
        let i = Math.max(0, fromIndex);
        while (i < feedSteps.length && getVisibleQuestions(i, answers).length === 0) i++;
        return i < feedSteps.length ? i : currentStep;
    };
    const findPrevVisibleStep = (fromIndex, currentStep) => {
        let i = Math.min(feedSteps.length - 1, fromIndex);
        while (i >= 0 && getVisibleQuestions(i, answers).length === 0) i--;
        return i >= 0 ? i : currentStep;
    };

    const nextIndex = findNextVisibleStep(step + 1, step);
    const prevIndex = findPrevVisibleStep(step - 1, step);

    const handleStepChange = (direction) => {
        setStep((prev) => {
            const target = direction === "next"
                ? findNextVisibleStep(prev + 1, prev)
                : findPrevVisibleStep(prev - 1, prev);
            return Math.max(0, Math.min(target, feedSteps.length - 1));
        });
    };

    const handleSubmit = () => {
        if (hiddenFormRef.current) {
            hiddenFormRef.current.submitForm();
        }
    };

    return (
        <div className="cardfeed">
            <div className="questions">
                <div className="Questionbox">
                    {visibleQuestions.map((data, index) => {
                        if (data.type === "Radio") {
                            return (
                                <Radiogroup
                                    key={index}
                                    label={data.label}
                                    values={data.values}
                                    sublabel={data.sublabel}
                                    SelectedAnswer={answers[data.name]}
                                    onAnsSelect={(selectedValue) => updateAnswer(data.name, selectedValue)}
                                    name={data.name}
                                />
                            );
                        } else if (data.type === "textbox") {
                            return (
                                <Textbox
                                    key={index}
                                    label={data.label}
                                    values={data.values || []}
                                    answers={answers}
                                    onTextChange={(label, text) => updateAnswer(label, text)}
                                />
                            );
                        } else if (data.type === "Dropdown") {
                            return (
                                <Dropdown
                                    key={index}
                                    label={data.label}
                                    values={data.values}
                                    dropdownlabel={data.dropdownlabel}
                                    selectedValue={answers[data.name]}
                                    onSelectChange={(selectedOption) => updateAnswer(data.name, selectedOption)}
                                />
                            );
                        } else if (data.type === "Checkbox") {
                            return (
                                <Checkboxgroup
                                    key={index}
                                    label={data.label}
                                    name={data.name}
                                    values={data.values}
                                    selectedValues={answers[data.name] || []}
                                    onChange={(newSelectedValues) => updateAnswer(data.name, newSelectedValues)}
                                />
                            );
                        } else if (data.type === "DisplayCard") {
                            return (
                                <DisplayCard
                                    key={index}
                                    selectedValues={answers["displayCardSelection"] || []}
                                    onSelectionChange={(newValues) => updateAnswer("displayCardSelection", newValues)}
                                    answers={answers}
                                    updateAnswer={updateAnswer}
                                />
                            );
                        } else if (data.type === "DisplayCardSeries") {
                            return (
                                <DisplayCardSeries
                                    key={index}
                                    selectedValues={answers["Seriescardselection"] || []}
                                    onSelectionChange={(newValues) => updateAnswer("Seriescardselection", newValues)}
                                    answers={answers}
                                    updateAnswer={updateAnswer}
                                />
                            );
                        } else if (data.type === "MultiLineInput") {
                            return (
                                <MultiLineInput
                                    key={index}
                                    label={data.label}
                                    description={data.description}
                                    placeholder={data.placeholder}
                                    value={answers[data.name] || ""}
                                    onChange={(val) => updateAnswer(data.name, val)}
                                />
                            );
                        } else if (data.type === "Listbox") {
                            return (
                                <DynamicListbox
                                    key={index}
                                    name={data.name}
                                    label={data.label}
                                    values={data.values || []}
                                    selectedValues={answers[data.name] || ""}
                                    onChange={(val) => updateAnswer(data.name, val)}
                                />
                            );
                        } else if (data.type === "DatePicker") {
                            return (
                                <DatePicker
                                    key={index}
                                    label={data.label}
                                    value={answers[data.name] || ""}
                                    onChange={(val) => updateAnswer(data.name, val)}
                                />
                            );
                        }
                        return null;
                    })}

                    <div className="flex gap-2">
                        <Button
                            color="primary"
                            variant="flat"
                            isDisabled={step === 0 || prevIndex === step}
                            onPress={() => handleStepChange("previous")}
                        >
                            Previous
                        </Button>
                        <Button
                            color="primary"
                            variant="flat"
                            isDisabled={step >= feedSteps.length - 1 || nextIndex === step}
                            onPress={() => handleStepChange("next")}
                        >
                            Next
                        </Button>
                        <Button color="primary" onPress={handleSubmit}>
                            Submit
                        </Button>
                        <HiddenForm ref={hiddenFormRef} answers={answers} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;