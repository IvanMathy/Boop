/**
  {
    "api":1,
    "name":"Extract Emails",
    "description":"Extracts, deduplicates, and sorts email addresses from your text",
    "author":"Lucas Cantor",
    "icon":"at",
    "tags":"email,extract,unique,deduplicate,sort"
  }
**/

function main(state) {
    // Regex to extract email addresses while avoiding ReDoS vulnerabilities
    const emailRegex = /\b[A-Za-z0-9](?:[A-Za-z0-9._+-]*[A-Za-z0-9])?@[A-Za-z0-9](?:[A-Za-z0-9.-]*[A-Za-z0-9])?\.[A-Za-z]{2,}\b/g;
    const text = state.text || "";
    const matches = text.match(emailRegex) || [];

    // Deduplicate email addresses (case-insensitive)
    const seen = new Set();
    const uniqueEmails = [];
    for (const email of matches) {
        const lower = email.toLowerCase();
        if (!seen.has(lower)) {
            seen.add(lower);
            uniqueEmails.push(email);
        }
    }

    // Sort email addresses (case-insensitive)
    uniqueEmails.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

    // Output email address one per line
    state.text = uniqueEmails.join('\n');
}
