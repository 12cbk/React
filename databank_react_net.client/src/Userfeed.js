import React, { useState, useEffect, useCallback, useRef } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Tooltip,
    Calendar,
} from "@heroui/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { Editfeed } from "./Editfeed";
import { useNavigate } from "react-router-dom";

export const columns = [
    { name: "Report Name", uid: "name" },
    { name: "Date Last Edited", uid: "Ldat" },
    { name: "Date Last run", uid: "Lrun" },
    { name: "Next Scheduled Run", uid: "Nrun" },
    { name: "Frequency", uid: "Freq" },
    { name: "Delivery Method", uid: "DM" },
    { name: "ACTIONS", uid: "actions" },
];

export const DeleteIcon = (props) => (
    <svg aria-hidden="true" fill="none" focusable="false" height="1em" role="presentation" viewBox="0 0 20 20" width="1em" {...props}>
        <path d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
        <path d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
        <path d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
        <path d="M8.60834 13.75H11.3833" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
        <path d="M7.91669 10.4167H12.0834" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
    </svg>
);

export const EditIcon = (props) => (
    <svg aria-hidden="true" fill="none" focusable="false" height="1em" role="presentation" viewBox="0 0 20 20" width="1em" {...props}>
        <path d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth={1.5} />
        <path d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth={1.5} />
        <path d="M2.5 18.3333H17.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth={1.5} />
    </svg>
);

export const RunIcon = (props) => (
    <svg aria-hidden="true" fill="currentColor" focusable="false" height="1em" role="presentation" viewBox="0 0 24 24" width="1em" {...props}>
        <path d="M5 3v18l15-9L5 3z" />
    </svg>
);

export const CalendarIcon = (props) => (
    <svg aria-hidden="true" fill="none" focusable="false" height="1em" role="presentation" viewBox="0 0 24 24" width="1em" {...props}>
        <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 3v4M8 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 11h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default function App() {
    
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const [scheduleOpen, setScheduleOpen] = useState(false);
    const [scheduleCoords, setScheduleCoords] = useState({ left: 0, top: 0 });
    const [scheduleDate, setScheduleDate] = useState(() => today(getLocalTimeZone()));
    const [authLoading, setAuthLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const popupRef = useRef(null);
    const currentTargetRef = useRef(null);
    const formRef = useRef(null);
    const scheduledFeedRef = useRef(null);

    const openSchedule = useCallback((event, user) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const belowTop = rect.bottom + 6;
        const aboveTop = rect.top - 220 - 6;
        const top = aboveTop > 8 ? aboveTop : belowTop;
        setScheduleCoords({ left: centerX, top });
        currentTargetRef.current = event.currentTarget;
        scheduledFeedRef.current = user?.id || null;
        setScheduleDate(today(getLocalTimeZone()));
        setScheduleOpen(true);
        event.stopPropagation();
    }, []);

    const closeSchedule = useCallback(() => {
        setScheduleOpen(false);
        currentTargetRef.current = null;
    }, []);

    // Authentication check (runs once)
    useEffect(() => {
        const controller = new AbortController();

        const ensureAuthenticated = async () => {
            try {
                setAuthLoading(true);
                const res = await fetch("/account/user", { credentials: "include", signal: controller.signal });

                if (res.status === 401) {
                    window.location.href = `/account/login?returnUrl=/userfeed`;
                    return;
                }

                if (!res.ok) {
                    console.error("Failed to verify user:", res.status, res.statusText);
                    window.location.href = `/account/login?returnUrl=/userfeed`;
                    return;
                }

                const json = await res.json();
                console.log("BFF user:", json);
                setIsAuthenticated(true);
            } catch (err) {
                console.error("Error verifying auth with BFF:", err);
                // network / CORS failure: redirect to interactive login
                window.location.href = `/account/login?returnUrl=/userfeed`;
                return;
            } finally {
                setAuthLoading(false);
            }
        };

        ensureAuthenticated();
        return () => controller.abort();
    }, []);

    // Close popup on outside click
    useEffect(() => {
        function onDocClick(e) {
            if (!scheduleOpen) return;
            if (popupRef.current && !popupRef.current.contains(e.target) && currentTargetRef.current !== e.target) {
                closeSchedule();
            }
        }
        document.addEventListener("mousedown", onDocClick);
        return () => document.removeEventListener("mousedown", onDocClick);
    }, [scheduleOpen, closeSchedule]);

    // Load feeds only after authenticated to avoid pre-auth network requests
    useEffect(() => {
        if (!isAuthenticated) return;

        const controller = new AbortController();
        const loadFeeds = async () => {
            try {
                const API = "https://localhost:7033" || "http://localhost:5000";
                let feedid = "5a79dee0-13da-11f0-8779-4f8904588f02";
                const res = await fetch(`${API}/api/feeds/${encodeURIComponent(feedid)}`, { signal: controller.signal });
                if (!res.ok) throw new Error("Network error");
                const data = await res.json();
                setUsers(data);
            } catch (err) {
                if (err.name === "AbortError") return;
                console.error("Failed to load feeds:", err);
                setUsers([]);
            }
        };
        loadFeeds();
        return () => controller.abort();
    }, [isAuthenticated]);

    const handleEdit = useCallback(
        async (user) => {
            try {
                const API = "https://localhost:7033" || "http://localhost:5000";
                const res = await fetch(`${API}/api/fastedit?search=${encodeURIComponent(user.id)}`);
                if (!res.ok) throw new Error("Failed to load fastedit");
                const text = await res.text();
                const editAnswers = Editfeed(text);
                navigate("/managefeed", { state: { feed: user, editAnswers } });
            } catch (err) {
                navigate("/managefeed", { state: { feed: user } });
            }
        },
        [navigate]
    );

    const renderCell = useCallback(
        (user, columnKey) => {
            const cellValue = user[columnKey];
            switch (columnKey) {
                case "actions":
                    return (
                        <div className="relative flex items-center gap-2">
                            <Tooltip content="Schedule">
                                <span
                                    role="button"
                                    tabIndex={0}
                                    onClick={(e) => openSchedule(e, user)}
                                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                                    title="Open schedule"
                                >
                                    <CalendarIcon />
                                </span>
                            </Tooltip>
                            <Tooltip content="Run feed">
                                <span
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => console.log("Run clicked for", user.id)}
                                    className="text-lg cursor-pointer active:opacity-50"
                                    style={{ color: "#16a34a" }}
                                    title="Run now"
                                >
                                    <RunIcon />
                                </span>
                            </Tooltip>
                            <Tooltip content="Edit feed">
                                <span role="button" tabIndex={0} onClick={() => handleEdit(user)} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                    <EditIcon />
                                </span>
                            </Tooltip>
                            <Tooltip color="danger" content="Delete feed">
                                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                    <DeleteIcon />
                                </span>
                            </Tooltip>
                        </div>
                    );
                default:
                    return cellValue;
            }
        },
        [openSchedule, handleEdit]
    );

    // Wait for auth check to complete before rendering main UI
    if (authLoading) {
        return <div style={{ padding: 20 }}>Checking authentication...</div>;
    }
    if (!isAuthenticated) {
        // fallback: we normally redirected above; keep empty render as safe fallback
        return null;
    }

    return (
        <>
            <Table aria-label="Example table with custom cells">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={users}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {scheduleOpen && (
                <div
                    ref={popupRef}
                    style={{
                        position: "fixed",
                        left: scheduleCoords.left,
                        top: scheduleCoords.top,
                        transform: "translateX(-50%)",
                        borderRadius: 8,
                        zIndex: 9999,
                        background: "#fff",
                        padding: 6,
                        boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                    }}
                >
                    <Calendar
                        aria-label="Schedule date"
                        value={scheduleDate}
                        defaultValue={today(getLocalTimeZone())}
                        minValue={today(getLocalTimeZone())}
                        onChange={(val) => {
                            setScheduleDate(val);
                            try {
                                let dateStr;
                                const jsDate = new Date(val.year, Number(val.month) - 1, Number(val.day));
                                dateStr = jsDate.toString();

                                if (formRef.current) {
                                    if (scheduledFeedRef.current) {
                                        formRef.current.MTIME.value = String(scheduledFeedRef.current);
                                    }
                                    if (formRef.current.RDATE) formRef.current.RDATE.value = dateStr;
                                    formRef.current.submit();
                                }
                            } catch (err) {
                                console.error("Failed to submit schedule form", err);
                            } finally {
                                closeSchedule();
                            }
                        }}
                    />
                </div>
            )}

            <div style={{ position: "absolute", top: -9999, left: -9999, visibility: "hidden" }}>
                <form name="schedForm" ref={formRef} method="post" encType="multipart/form-data" action="/cgi-bin/FormToStar.pl">
                    <input type="hidden" name="MTIME" value="" />
                    <input type="hidden" name="RDATE" value="" />
                    <input type="hidden" name="*STARLOAD" value="DATABANKSC" />
                    <input type="hidden" name="refault" value="" />
                    <input type="hidden" name="near" value="" />
                    <input type="hidden" name="formatListValue" value="" />
                    <input type="hidden" name="form_id" value="::par::form_id::::" />
                    <input type="hidden" name="form_path" value="::par::form_path::::" />
                    <input type="hidden" name="form_from" value="::par::form_from::::" />
                    <input type="hidden" name="form_ack" value="yes" />
                    <input type="hidden" name="form_action" value="submit" />
                    <input type="hidden" name="*RECN" value="::par::rec_num::0::" />
                    <input type="hidden" name="*FILER" value="::par::user_id::0::" />
                    <input type="hidden" name="*DBN" value="DATABANKSC" />
                    <input type="hidden" name="form_ok" value="/gb/dsform_ok.html" />
                </form>
            </div>
        </>
    );
}