---
name: application-tracker
description: Keep a plain-text tracker of jobs the user is considering or has applied to, built from Employed by Guaq AI results. Use when the user says "save these", "track my applications", "what did I apply to", "remind me to follow up", or wants a shortlist exported as a table or CSV.
license: MIT
metadata:
  author: Guaq AI
  version: "1.1.0"
---

# Application tracker

A tracker is a local Markdown or CSV file that the user owns. It never leaves their machine and this skill never submits applications.

## Setup

1. Ask where the tracker should live, or whether they prefer a table in the chat. Suggest `job-tracker.md` in the current folder. Do not create or overwrite files without the user's yes, and never write outside the folder they approve.
2. Use these columns: `id` (posting id), `company`, `title`, `location`, `work mode`, `apply url`, `status`, `date added`, `date applied`, `next step`, `notes`.
3. Statuses: `shortlisted`, `applied`, `interviewing`, `offer`, `rejected`, `withdrawn`, `closed`.

## Workflows

- **Save results**: take rows the user picked from a search, add them as `shortlisted` with today's date. Skip duplicates by posting `id`.
- **Update**: change status, add notes, set a next step. Show the change before writing.
- **Check still live**: for each `shortlisted` or `applied` row, call `get_job` with the `id`; if the posting is gone or marked not active, tell the user and offer to set `closed`.
- **Review**: summarise counts by status, list items with a next step due, and suggest follow-ups the user can send themselves. Do not send messages for them.
- **Export**: a Markdown table for chat, or CSV written to a path the user approves.

## Rules

- Record only what the user or the search results provided. Do not invent contacts, deadlines or interview dates.
- Keep notes the user writes verbatim; do not summarise them away.
- No credentials, resume text or personal details in the tracker unless the user adds them.
