/**
 * The Zinthiya Trust - Beneficiary Portal Internationalization (i18n) Dictionary
 * Comprehensive multilingual support across 11 languages:
 * English (en), Gujarati (gu), Hindi (hi), Punjabi (pa), Urdu (ur),
 * Polish (pl), Somali (so), Arabic (ar), Bengali (bn), Malayalam (ml), Tamil (ta).
 */

export type SupportedLanguage =
  | "en"
  | "gu"
  | "hi"
  | "pa"
  | "ur"
  | "pl"
  | "so"
  | "ar"
  | "bn"
  | "ml"
  | "ta";

export interface LanguageOption {
  code: SupportedLanguage;
  label: string;
  sub: string;
  dir?: "ltr" | "rtl";
}

export const BENEFICIARY_LANGUAGES: LanguageOption[] = [
  { code: "en", label: "English", sub: "United Kingdom", dir: "ltr" },
  { code: "gu", label: "ગુજરાતી", sub: "Gujarati", dir: "ltr" },
  { code: "hi", label: "हिन्दी", sub: "Hindi", dir: "ltr" },
  { code: "pa", label: "ਪੰਜਾਬੀ", sub: "Punjabi", dir: "ltr" },
  { code: "ur", label: "اردو", sub: "Urdu", dir: "rtl" },
  { code: "pl", label: "Polski", sub: "Polish", dir: "ltr" },
  { code: "so", label: "Af-Soomaali", sub: "Somali", dir: "ltr" },
  { code: "ar", label: "العربية", sub: "Arabic", dir: "rtl" },
  { code: "bn", label: "বাংলা", sub: "Bengali", dir: "ltr" },
  { code: "ml", label: "മലയാളം", sub: "Malayalam", dir: "ltr" },
  { code: "ta", label: "தமிழ்", sub: "Tamil", dir: "ltr" },
];

export const BENEFICIARY_TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    lbl_effective_date: "Effective:",
    lbl_email_address: "Registered Email Address *",
    modal_allocation_cert_notice: "This assistance package was formally reviewed and authorized by The Zinthiya Trust for beneficiary",
    effective_date_label: "Effective / Payout Date",
    funding_auth_label: "Funding Partner & Authorization",
    permitted_terms_label: "Permitted Use & Terms",
    conversations_sub: "Switch between active casework discussions and previous resolved assistance records.",
    advocate_info_btn: "Advocate Info & Direct Line →",
    no_notifications_sub: "You have no active alerts. Verified updates regarding your emergency grants, applications, and caseworker messages will appear here in real-time.",

    // Nav
    portal_badge: "BENEFICIARY PORTAL",
    nav_dashboard: "Dashboard",
    nav_profile: "My Profile",
    nav_assistance: "Allocated Assistance",
    nav_history: "Support History",
    nav_messages: "Messages / Advocate",
    nav_notifications: "Notifications",
    nav_language: "Language Settings",
    nav_logout: "Logout",
    helpline_title: "Casework Helpline",
    helpline_hours: "Mon - Fri, 9:00am - 4:30pm",

    // Header
    client_care_portal: "Client Care Portal",
    caseworker_prefix: "Caseworker:",
    crisis_advocate_badge: "Dedicated Crisis Advocate",
    btn_request_support: "+ Request Support",
    btn_logout: "Log out",

    // Dashboard
    welcome_back: "Welcome back",
    active_beneficiary: "ACTIVE BENEFICIARY",
    case_ref: "Case Ref:",
    gdpr_verified: "UK GDPR Verified Account",
    display_currency: "Display Currency:",
    registered_contact: "Registered Contact",
    registered_home_address: "Registered Home Address",
    dedicated_worker: "Dedicated Crisis Worker",
    case_support_status: "Case Support Status",
    active_support: "Active Support",
    stat_total_allocated: "Total Support Allocated",
    stat_distributed: "Distributed to Date",
    stat_pending_payout: "Pending Assistance Payout",
    stat_pending_requests: "Pending Applications",
    stat_caseworker: "Dedicated Caseworker",
    stat_unread_messages: "Unread Messages",
    quick_actions: "Quick Actions",
    qa_send_message: "Send Message to Caseworker",
    qa_view_grants: "View Grant & Allocations",
    qa_emergency_line: "Emergency Hardship Line",
    recent_activity: "Recent Case Activity & Alerts",
    no_recent_activity: "No recent activity recorded.",
    active_allocations_title: "Active Allocations",
    no_active_allocations: "No active allocations found.",
    view_all: "View All",

    // Profile
    profile_title: "Client Profile & Care Dossier",
    profile_subtitle: "Your verified client registration details, assigned advocate, and emergency contacts on file.",
    personal_details: "Personal Details",
    full_name: "Full Name",
    client_ref: "Client Reference Number",
    dob: "Date of Birth",
    gender: "Gender",
    primary_language: "Primary Language",
    contact_details: "Contact Details",
    email_address: "Email Address",
    phone_number: "Phone Number",
    residential_address: "Residential Address",
    council_area: "Council Area",
    emergency_contact: "Emergency Contact",
    next_of_kin: "Next of Kin / Contact Name",
    emergency_phone: "Emergency Contact Phone",
    casework_assignment: "Casework Assignment",
    assigned_advocate: "Assigned Advocate",
    secondary_worker: "Duty Welfare Advocate",
    case_status: "Case Status",
    support_type: "Support Type",
    household_size: "Household Size",
    change_password: "Change Portal Password",
    current_password: "Current Password",
    new_password: "New Password",
    confirm_new_password: "Confirm New Password",
    btn_update_password: "Update Password",

    // Allocated Assistance
    assistance_title: "Allocated Assistance & Grant Records",
    assistance_subtitle: "Approved financial and emergency welfare support allocated by The Zinthiya Trust.",
    filter_all: "All Approved",
    filter_pending: "Pending Payout",
    filter_distributed: "Distributed",
    alloc_amount: "Allocated Support Amount",
    alloc_date: "Allocation Date",
    alloc_purpose: "Purpose of Allocation",
    alloc_method: "Disbursement Method",
    alloc_award_letter: "Award Letter (PDF)",
    download_pdf: "Downloading Official Allocation Notice PDF...",
    no_allocations_found: "No allocations found matching this filter.",

    // Support History
    history_title: "Support History & Application Log",
    history_subtitle: "Track your past and active support applications, urgency status, and caseworker assessments.",
    col_category: "Service / Need Category",
    col_date: "Application Date",
    col_urgency: "Urgency Level",
    col_status: "Status",
    col_worker: "Assigned Worker",
    col_notes: "Application Notes",
    no_history_records: "No support applications recorded.",

    // Messages / Advocate
    translation_banner_title: "Automated Language Detection & Real-Time Translation",
    translation_banner_sub: "Write in your native language. Messages are automatically detected and translated for your advocate.",
    translate_into: "Translate into:",
    auto_translate: "Auto-Translate",
    btn_request_interpreter: "+ Request Live Interpreter",
    interpreter_requested: "Live Interpreter Requested",
    threads_title: "Conversations & Casework Threads",
    active_thread_title: "Casework Advocacy & Direct Messaging",
    direct_caseworker: "Direct Caseworker:",
    gdpr_encrypted: "UK GDPR 256-Bit Encrypted",
    encrypted_banner: "Messages in this thread are confidential, encrypted, and certified under UK Charity Law.",
    no_messages_yet: "No messages yet",
    no_messages_sub: "Send a text or voice note below to start the conversation directly with your assigned advocate.",
    chat_placeholder: "Type a confidential message to your assigned caseworker (or write in your native language)...",
    btn_send: "Send",
    btn_voice_note: "Voice Note",
    recording_text: "Recording voice note...",
    btn_stop_record: "Stop & Attach",
    btn_translate_msg: "Translate Message",
    original_text: "Original Text:",
    original_audio_transcript: "Original Audio Transcript:",

    // Notifications
    notifications_title: "Notifications & Case Alerts",
    notifications_subtitle: "Recent updates on your support applications, grant allocations, and messages.",
    btn_mark_all_read: "Mark all as read",
    no_notifications: "No new notifications",

    // Language Settings
    lang_settings_title: "Language Settings & Interpreter Preferences",
    lang_settings_subtitle: "Select your preferred language. The Zinthiya Trust provides accredited translation for all correspondence, meetings, and messaging.",
    btn_save_language: "Save Language Selection",
    toast_lang_saved: "Language preferences updated successfully. All portal content is now displayed in your chosen language.",

    // Modals
    modal_request_title: "Request Support or Emergency Assistance",
    modal_request_sub: "Your request goes directly to assigned caseworker",
    form_category: "Assistance Category *",
    form_urgency: "Urgency Level *",
    form_notes: "Brief Details / What You Need *",
    form_notes_placeholder: "Provide brief details about what you urgently need...",
    btn_cancel: "Cancel",
    btn_submit_request: "Submit Request",
    submitting: "Submitting...",
    modal_logout_title: "Confirm Logout",
    modal_logout_desc: "Are you sure you want to log out of the Beneficiary Portal? All session credentials will be cleared.",
    kpi_distributed_sub: "Total approved and disbursed community relief aid.",
    kpi_allocated_sub: "Current active grants and assistance undergoing fulfillment.",
    advocate_details_title: "Assigned Advocate Details",
    active_advocate_badge: "ACTIVE ADVOCATE",
    advocate_role_title: "Senior Family Welfare & Crisis Advocate",
    available_today: "• Available for Consultations Today",
    direct_helpline_label: "Direct Helpline:",
    duty_email_label: "Duty Email:",
    duty_hours_text: "Duty Hours: Mon – Fri, 9:00am – 4:30pm",
    btn_message_caseworker: "Message Caseworker",
    btn_call_caseworker: "Call Caseworker",
    tab_recent_messages: "Recent Messages",
    tab_notifications: "Notifications",
    view_all_arrow: "View all →",
    duty_office_badge: "Duty Office",
    welcome_portal_message: "\"Welcome to your Zinthiya Trust client portal. You can review your case file, check allocated aid, or request emergency assistance.\"",
    btn_open_advocate_thread: "Open Advocate Messaging Thread →",
    no_active_notifications: "No active notifications recorded.",
    filter_all_records: "All Records",
    filter_received: "Received",
    filter_approved: "Approved",
    filter_cancelled: "Cancelled",
    filter_completed: "Completed",
    tab_applied_requests: "Applied Requests",
    col_assistance_type: "Assistance type",
    col_amount: "Amount",
    col_action: "Action",
    is_typing: "is typing...",
    approved_by_trustees: "APPROVED BY TRUSTEES",
    download_award_summary: "Download Award Summary (PDF)",
    active_allocations_count: "Active Allocation(s)",
    active_approved_grants: "Active Approved Grants",
    allocations_badge: "Allocations",
    trustee_verified_auth: "100% Trustee Verified & Authorized",
    filter_disbursed_active: "Disbursed & Active",
    btn_grant_cards: "Grant Cards",
    btn_table_view: "Table View",
    search_assistance_placeholder: "Search purpose, grant, ref...",
    alloc_details_governance: "Assistance Details & Governance",
    lbl_funding_partner: "Funding Partner:",
    lbl_supervising_caseworker: "Supervising Caseworker:",
    lbl_disbursement_method: "Disbursement Method:",
    lbl_trustee_authority: "Trustee Authority:",
    lbl_permitted_use: "Permitted Use:",
    milestone_tracker_title: "Current Status & Milestone Tracker",
    valid_through: "Valid Through:",
    current_relief_period: "Current Relief Period",
    certified_care_charter: "Certified Under The Zinthiya Trust Care Charter",
    btn_award_letter_pdf: "Award Letter (PDF)",
    btn_view_full_details: "View Full Details →",
    view_details: "View Details",
    tbl_col_allocated_amount: "Allocated Amount",
    tbl_col_purpose_ref: "Purpose of Allocation",
    tbl_col_alloc_date: "Allocation Date",
    tbl_col_current_status: "Current Status",
    tbl_col_details_action: "Details & Action",
    btn_close: "Close",
    btn_print_notice: "Print Allocation Notice",
    advocate_dossier_title: "Assigned Advocate Dossier",
    btn_book_appointment: "Book Appointment",
    lbl_preferred_name: "Preferred Name / Salutation *",
    lbl_preferred_lang: "Preferred Spoken & Written Language",
    btn_save_personal_info: "Save Personal Information",
    btn_save_contact_details: "Save Contact Details",
    "badge_support_archive": "SUPPORT ARCHIVE",
    "lbl_case_ref": "Case Ref:",
    "kpi_support_received": "SUPPORT RECEIVED",
    "kpi_disbursed_received": "Grants Disbursed & Received",
    "kpi_allocated_support": "ALLOCATED SUPPORT",
    "kpi_pending_payout": "Grant(s) Pending Payout",
    "kpi_total_tracked": "TOTAL ASSISTANCE TRACKED",
    "kpi_records": "Record(s)",
    "kpi_casework_ledger_active": "Official Casework Ledger Active",
    "status_received": "Received",
    "status_approved": "Approved",
    "th_assistance_type": "Assistance type",
    "th_amount": "Amount",
    "th_status": "Status",
    "th_date": "Date",
    "th_action": "Action",
    "btn_view_details": "View Details",
    "lbl_submitted_by_client": "Submitted by client",
    "lbl_allocated_prefix": "Allocated: ",
    "footer_certified_ledger": "Certified official assistance ledger for {name} • UK Charity No. 1137350.",
    "milestones_title": "Casework Milestones & Timeline",
    "milestones_sub": "Step-by-step history of consultations, grant distributions, and completed assessments.",
    "step_intake_assigned": "CASE INTAKE & ADVOCATE ASSIGNED",
    "step_account_active": "Beneficiary Account Active & Verified",
    "step_intake_desc": "Client registered on the Zinthiya Trust Portal. Assigned dedicated caseworker.",
    "btn_download_ledger": "Download Official Support Ledger",
    "modal_assistance_details": "Assistance Details",
    "lbl_allocated_funds_title": "Allocated Funds from Support Requests",
    "lbl_total_allocated_prefix": "Total Allocated: ",
    "lbl_admin_feedback": "Admin Review Notes & Feedback:",
    "btn_download_statement": "Download Statement",
    "lbl_credentials": "Professional Credentials:",
    "lbl_badge_id": "Advocate Badge ID:",
    "lbl_office_hours": "Office Hours:",
    "lbl_office_loc": "Physical Office Location:",
    "lbl_casework_languages": "Casework Languages:",
    "lbl_advocate_bio": "Advocate Background",
    "urgency_high": "High Priority (Urgent Needs within 24-48 hrs)",
    "urgency_critical": "Critical Emergency (Immediate Crisis)",
    "urgency_medium": "Standard Support (Next 3-5 Working Days)",
    "lbl_supporting_docs": "Supporting Documents",
    "lbl_attach_docs_hint": "Attach bills, letters, notices, IDs",
    "btn_add_supporting_docs": "+ Add Supporting Documents (Multiple Allowed)",
    "profile_personal_sub": "View official records and update permitted client identification details.",
    "lbl_full_legal_name": "Full Legal Name (Official Record)",
    "lbl_verified_record": "Verified Record",
    "lbl_legal_name_hint": "To update your official legal name, caseworker identity verification is required.",
    "lbl_preferred_salutation": "Preferred Name / Salutation *",
    "lbl_preferred_name_hint": "How you prefer caseworkers and support staff to address you.",
    "lbl_case_reference_num": "Client Case Reference Number",
    "lbl_dob_verified": "Date of Birth (Verified)",
    "lbl_pref_spoken_written": "Preferred Spoken & Written Language",
    "lbl_interpreter_session": "Accredited Interpreter for In-Person Sessions",
    "opt_not_required": "Not required",
    "opt_require_interpreter": "Require Interpreter",
    "profile_contact_sub": "Manage your phone numbers, email, and emergency contact details for casework updates.",
    "lbl_primary_phone": "Primary Mobile Phone Number *",
    "lbl_secondary_phone": "Alternative / Home Landline (Optional)",
    "lbl_preferred_contact_method": "Preferred Contact Method",
    "lbl_best_time_to_call": "Best Time to Call",
    "lbl_emergency_name": "Emergency Next of Kin Name",
    "lbl_emergency_phone": "Emergency Contact Number",
    "lbl_emergency_rel": "Emergency Contact Relationship",
    "profile_housing_sub": "Ensure your registered residence is accurate for utility vouchers, deliveries, and council benefits.",
    "lbl_proof_verified": "PROOF VERIFIED",
    "lbl_address_line1": "Address Line 1 (Street & House Number) *",
    "lbl_address_line2": "Address Line 2 (Flat / Apartment - Optional)",
    "lbl_city": "Town / City *",
    "lbl_postcode": "Postcode *",
    "lbl_housing_tenure": "Housing Tenure & Living Situation",
    "btn_save_address": "Save Address Information",
    "profile_security_title": "Security & Password Management",
    "profile_security_sub": "Ensure your account is protected with a strong, confidential password.",
    "lbl_current_pw": "Current Password *",
    "lbl_new_pw": "New Password *",
    "lbl_confirm_new_pw": "Confirm New Password *",
    "gdpr_notice_title": "UK GDPR Data Protection & Permitted Changes",
    "gdpr_notice_desc": "You can update your preferred name, primary/secondary phone numbers, email address, living address, communication methods, and password self-service at any time. Changes to legal names, dates of birth, or registered dependents require caseworker identity verification to maintain compliance with charitable grant awards.",
    "online_duty_caseworker": "Online • Duty Caseworker",
    "typically_replies": "Typically replies within 2 hours during duty hours",
    "btn_call_advocate": "Call Advocate",
    "btn_view_advocate_profile": "View Full Advocate Profile",
    "advocate_spoken_langs": "Advocate Spoken Languages:",
    "btn_stop_send_voice": "Stop & Send Voice Note",
    "lbl_playing_audio": "Playing audio...",
    "lbl_voice_message": "Voice Message",
    "lbl_show_orig_transcript": "Show Original Audio Transcript",
    "lbl_translate_transcript": "Translate Audio Transcript",
    "lbl_translating": "Translating...",
    "lbl_recording_voice": "Recording voice note...",
    "urgent_emergency_title": "Urgent Emergency Casework?",
    "urgent_emergency_desc": "If your energy supply is disconnected or you require urgent crisis shelter, call the Trust duty desk immediately on 0116 254 5168.",
    "msg_pw_changed_success": "Your password has been changed successfully.",
    "btn_save": "Save",
    "lbl_show_original": "Show Original Message",
    "lbl_show_orig_en": "Show Original (English)",
    "btn_translate_into": "Translate into",
    "lbl_note_relocating": "Note for Relocating:",
    "desc_note_relocating": "If you move to a new property, updating your address above ensures food hampers and utility vouchers are dispatched to your current home. Your caseworker may request a photo of your new tenancy agreement or Council Tax bill.",
    "lbl_app_stage": "Application Stage",
    "lbl_award_amount": "Award Amount",
    "lbl_reference_id": "Reference ID",
    "lbl_submitted_for_approval": "What You Submitted for Admin Approval:",
    "lbl_assistance_notes": "Assistance Scope & Notes:",
    "lbl_supporting_docs_approval": "Supporting Documents Given for Approval",
    "btn_view_file": "View File",
    "lbl_linked_allocations": "Linked Assistance Allocations",
    "lbl_total_colon": "Total:",
    "lbl_intake_case_ref": "Intake registered under Case Ref:",
    "badge_recorded": "RECORDED",
  },

  gu: {
    lbl_effective_date: "અસરકારક:",
    lbl_email_address: "નોંધાયેલ ઇમેઇલ સરનામું *",
    modal_allocation_cert_notice: "આ સહાય પેકેજની ધ ઝિન્થિયા ટ્રસ્ટ દ્વારા લાભાર્થી માટે સત્તાવાર સમીક્ષા અને અધિકૃતતા કરવામાં આવી છે",
    effective_date_label: "અસરકારક / ચુકવણી તારીખ",
    funding_auth_label: "ભંડોળ ભાગીદાર અને અધિકૃતતા",
    permitted_terms_label: "મંજૂર ઉપયોગ અને શરતો",
    conversations_sub: "સક્રિય કેસવર્ક ચર્ચાઓ અને અગાઉના ઉકેલાયેલા સહાય રેકોર્ડ્સ વચ્ચે સ્વિચ કરો.",
    advocate_info_btn: "સલાહકાર વિગતો અને ડાયરેક્ટ હેલ્પલાઇન →",
    no_notifications_sub: "કોઈ સક્રિય ચેતવણીઓ નથી. તમારી કટોકટી અનુદાન, અરજીઓ અને કેસવર્કર સંદેશાઓના અપડેટ્સ અહીં વાસ્તવિક સમયમાં દેખાશે.",

    // Nav
    portal_badge: "લાભાર્થી પોર્ટલ",
    nav_dashboard: "ડેશબોર્ડ",
    nav_profile: "મારી પ્રોફાઇલ",
    nav_assistance: "ફાળવેલ સહાય",
    nav_history: "સહાય ઇતિહાસ",
    nav_messages: "સંદેશાઓ / સલાહકાર",
    nav_notifications: "સૂચનાઓ",
    nav_language: "ભાષા સેટિંગ્સ",
    nav_logout: "લૉગ આઉટ",
    helpline_title: "કેસવર્ક હેલ્પલાઇન",
    helpline_hours: "સોમ - શુક્ર, સવારે 9:00 - સાંજે 4:30",

    // Header
    client_care_portal: "ક્લાયંટ કેર પોર્ટલ",
    caseworker_prefix: "કેસવર્કર:",
    crisis_advocate_badge: "સમર્પિત કટોકટી સલાહકાર",
    btn_request_support: "+ સહાય વિનંતી કરો",
    btn_logout: "લૉગ આઉટ",

    // Dashboard
    welcome_back: "પાછા સ્વાગત છે",
    active_beneficiary: "સક્રિય લાભાર્થી",
    case_ref: "કેસ સંદર્ભ:",
    gdpr_verified: "UK GDPR ચકાસાયેલ ખાતું",
    display_currency: "ચલણ દર્શાવો:",
    registered_contact: "નોંધાયેલ સંપર્ક",
    registered_home_address: "નોંધાયેલ સરનામું",
    dedicated_worker: "સમર્પિત કટોકટી કાર્યકર",
    case_support_status: "સહાય સ્થિતિ",
    active_support: "સક્રિય સહાય",
    stat_total_allocated: "કુલ ફાળવેલ સહાય",
    stat_distributed: "અત્યાર સુધી વહેંચાયેલ",
    stat_pending_payout: "બાકી સહાય ચુકવણી",
    stat_pending_requests: "બાકી અરજીઓ",
    stat_caseworker: "સમર્પિત કેસવર્કર",
    stat_unread_messages: "ન વાંચેલા સંદેશાઓ",
    quick_actions: "ઝડપી ક્રિયાઓ",
    qa_send_message: "કેસવર્કરને સંદેશ મોકલો",
    qa_view_grants: "ગ્રાન્ટ અને ફાળવણી જુઓ",
    qa_emergency_line: "ઇમરજન્સી હેલ્પલાઇન",
    recent_activity: "તાજેતરની પ્રવૃત્તિ અને ચેતવણીઓ",
    no_recent_activity: "કોઈ તાજેતરની પ્રવૃત્તિ નોંધાઈ નથી.",
    active_allocations_title: "સક્રિય ફાળવણી",
    no_active_allocations: "કોઈ સક્રિય ફાળવણી મળી નથી.",
    view_all: "બધું જુઓ",

    // Profile
    profile_title: "ક્લાયંટ પ્રોફાઇલ અને કેર ડૉઝિયર",
    profile_subtitle: "તમારી ચકાસાયેલ ક્લાયંટ નોંધણી વિગતો, સોંપેલ સલાહકાર અને કટોકટી સંપર્કો.",
    personal_details: "વ્યક્તિગત વિગતો",
    full_name: "પૂરું નામ",
    client_ref: "ક્લાયન્ટ સંદર્ભ નંબર",
    dob: "જન્મ તારીખ",
    gender: "જાતિ",
    primary_language: "મુખ્ય ભાષા",
    contact_details: "સંપર્ક વિગતો",
    email_address: "ઇમેઇલ સરનામું",
    phone_number: "ફોન નંબર",
    residential_address: "રહેઠાણનું સરનામું",
    council_area: "કાઉન્સિલ વિસ્તાર",
    emergency_contact: "કટોકટી સંપર્ક",
    next_of_kin: "સંબંધી / સંપર્ક નામ",
    emergency_phone: "કટોકટી ફોન નંબર",
    casework_assignment: "કેસવર્ક સોંપણી",
    assigned_advocate: "સોંપાયેલ સલાહકાર",
    secondary_worker: "ડ્યુટી વેલફેર એડવોકેટ",
    case_status: "કેસ સ્થિતિ",
    support_type: "સહાય પ્રકાર",
    household_size: "પરિવારનું કદ",
    change_password: "પાસવર્ડ બદલો",
    current_password: "વર્તમાન પાસવર્ડ",
    new_password: "નવો પાસવર્ડ",
    confirm_new_password: "નવા પાસવર્ડની પુષ્ટિ કરો",
    btn_update_password: "પાસવર્ડ અપડેટ કરો",

    // Allocated Assistance
    assistance_title: "ફાળવેલ સહાય અને ગ્રાન્ટ રેકોર્ડ્સ",
    assistance_subtitle: "ધ ઝિન્થિયા ટ્રસ્ટ દ્વારા મંજૂર નાણાકીય અને કટોકટી સહાય.",
    filter_all: "બધા મંજૂર",
    filter_pending: "બાકી ચુકવણી",
    filter_distributed: "વહેંચાયેલ",
    alloc_amount: "ફાળવેલ સહાય રકમ",
    alloc_date: "ફાળવણી તારીખ",
    alloc_purpose: "ફાળવણીનો હેતુ",
    alloc_method: "ચુકવણી પદ્ધતિ",
    alloc_award_letter: "એવોર્ડ પત્ર (PDF)",
    download_pdf: "સત્તાવાર ફાળવણી નોટિસ PDF ડાઉનલોડ થઈ રહી છે...",
    no_allocations_found: "આ ફિલ્ટર સાથે મેળ ખાતી કોઈ ફાળવણી મળી નથી.",

    // Support History
    history_title: "સહાય ઇતિહાસ અને અરજી લૉગ",
    history_subtitle: "તમારી ભૂતકાળની અને સક્રિય અરજીઓ અને સ્થિતિ ટ્રૅક કરો.",
    col_category: "સેવા / જરૂરિયાત શ્રેણી",
    col_date: "અરજી તારીખ",
    col_urgency: "તાકીદનું સ્તર",
    col_status: "સ્થિતિ",
    col_worker: "સોંપાયેલ કાર્યકર",
    col_notes: "અરજી નોંધો",
    no_history_records: "કોઈ સહાય અરજીઓ નોંધાયેલ નથી.",

    // Messages / Advocate
    translation_banner_title: "સ્વચાલિત ભાષા શોધ અને રીઅલ-ટાઇમ અનુવાદ",
    translation_banner_sub: "તમારી માતૃભાષામાં લખો. સંદેશાઓ આપમેળે ઓળખાય છે અને અનુવાદિત થાય છે.",
    translate_into: "અનુવાદ કરો:",
    auto_translate: "સ્વચાલિત અનુવાદ",
    btn_request_interpreter: "+ લાઇવ દુભાષિયાની વિનંતી કરો",
    interpreter_requested: "દુભાષિયા વિનંતી કરવામાં આવી છે",
    threads_title: "વાતચીત અને કેસવર્ક થ્રેડો",
    active_thread_title: "કેસવર્ક અને ડાયરેક્ટ મેસેજિંગ",
    direct_caseworker: "ડાયરેક્ટ કેસવર્કર:",
    gdpr_encrypted: "UK GDPR 256-બીટ એન્ક્રિપ્ટેડ",
    encrypted_banner: "આ થ્રેડમાંના સંદેશાઓ યુકે ચેરિટી કાયદા હેઠળ ગોપનીય અને એન્ક્રિપ્ટેડ છે.",
    no_messages_yet: "હજી કોઈ સંદેશ નથી",
    no_messages_sub: "તમારા કેસવર્કર સાથે સીધી વાતચીત શરૂ કરવા માટે નીચે સંદેશ લખો.",
    chat_placeholder: "તમારા કેસવર્કરને સંદેશ લખો (અથવા તમારી ભાષામાં લખો)...",
    btn_send: "મોકલો",
    btn_voice_note: "વૉઇસ નોટ",
    recording_text: "વૉઇસ રેકોર્ડિંગ ચાલુ છે...",
    btn_stop_record: "રોકો અને જોડો",
    btn_translate_msg: "સંદેશ અનુવાદ કરો",
    original_text: "મૂળ લખાણ:",
    original_audio_transcript: "મૂળ ઓડિયો ટ્રાન્સક્રિપ્ટ:",

    // Notifications
    notifications_title: "સૂચનાઓ અને કેસ ચેતવણીઓ",
    notifications_subtitle: "તમારી સહાય અરજીઓ, ગ્રાન્ટ ફાળવણી અને સંદેશાઓ પર તાજેતરના અપડેટ્સ.",
    btn_mark_all_read: "બધા વંચાયેલા તરીકે ચિહ્નિત કરો",
    no_notifications: "કોઈ નવી સૂચનાઓ નથી",

    // Language Settings
    lang_settings_title: "ભાષા સેટિંગ્સ અને દુભાષિયા પસંદગીઓ",
    lang_settings_subtitle: "તમારી પસંદગીની ભાષા પસંદ કરો. ઝિન્થિયા ટ્રસ્ટ તમામ પત્રવ્યવહાર અને બેઠકો માટે માન્યતાપ્રાપ્ત અનુવાદ પ્રદાન કરે છે.",
    btn_save_language: "ભાષા પસંદગી સાચવો",
    toast_lang_saved: "ભાષા પસંદગી સફળતાપૂર્વક સાચવવામાં આવી. પોર્ટલની સામગ્રી હવે તમારી પસંદ કરેલી ભાષામાં પ્રદર્શિત થાય છે.",

    // Modals
    modal_request_title: "સહાય અથવા કટોકટી સહાયની વિનંતી કરો",
    modal_request_sub: "તમારી વિનંતી સીધી સોંપાયેલ કેસવર્કર પાસે જાય છે",
    form_category: "સહાય શ્રેણી *",
    form_urgency: "તાકીદનું સ્તર *",
    form_notes: "વિગતો / તમને શું જોઈએ છે *",
    form_notes_placeholder: "તમને તાત્કાલિક શું જોઈએ છે તેની ટૂંકી વિગતો પ્રદાન કરો...",
    btn_cancel: "રદ કરો",
    btn_submit_request: "વિનંતી સબમિટ કરો",
    submitting: "સબમિટ થઈ રહ્યું છે...",
    modal_logout_title: "લૉગ આઉટની પુષ્ટિ કરો",
    modal_logout_desc: "શું તમે ખરેખર લાભાર્થી પોર્ટલમાંથી લૉગ આઉટ કરવા માંગો છો?",
    kpi_distributed_sub: "કુલ મંજૂર અને વિતરિત સમુદાય રાહત સહાય.",
    kpi_allocated_sub: "હાલમાં પૂર્ણ થઈ રહેલી સક્રિય ગ્રાન્ટ્સ અને સહાય.",
    advocate_details_title: "સોંપાયેલ સલાહકારની વિગતો",
    active_advocate_badge: "સક્રિય સલાહકાર",
    advocate_role_title: "વરિષ્ઠ કૌટુંબિક કલ્યાણ અને કટોકટી સલાહકાર",
    available_today: "• આજે પરામર્શ માટે ઉપલબ્ધ",
    direct_helpline_label: "સીધી હેલ્પલાઇન:",
    duty_email_label: "ડ્યુટી ઇમેઇલ:",
    duty_hours_text: "ડ્યુટી સમય: સોમ – શુક્ર, સવારે 9:00 – સાંજે 4:30",
    btn_message_caseworker: "કેસવર્કરને સંદેશ મોકલો",
    btn_call_caseworker: "કેસવર્કરને કૉલ કરો",
    tab_recent_messages: "તાજેતરના સંદેશાઓ",
    tab_notifications: "સૂચનાઓ",
    view_all_arrow: "બધું જુઓ →",
    duty_office_badge: "ડ્યુટી ઓફિસ",
    welcome_portal_message: "\"તમારા ઝિંથિયા ટ્રસ્ટ ક્લાયંટ પોર્ટલમાં આપનું સ્વાગત છે. તમે તમારી કેસ ફાઇલની સમીક્ષા કરી શકો છો, ફાળવેલ સહાય ચકાસી શકો છો અથવા કટોકટી સહાયની વિનંતી કરી શકો છો.\"",
    btn_open_advocate_thread: "સલાહકાર મેસેજિંગ થ્રેડ ખોલો →",
    no_active_notifications: "કોઈ સક્રિય સૂચનાઓ નોંધાયેલ નથી.",
    filter_all_records: "બધા રેકોર્ડ્સ",
    filter_received: "પ્રાપ્ત થયેલ",
    filter_approved: "મંજૂર થયેલ",
    filter_cancelled: "રદ કરેલ",
    filter_completed: "પૂર્ણ થયેલ",
    tab_applied_requests: "અરજી કરેલ વિનંતીઓ",
    col_assistance_type: "સહાયનો પ્રકાર",
    col_amount: "રકમ",
    col_action: "ક્રિયા",
    is_typing: "ટાઇપ કરી રહ્યાં છે...",
    approved_by_trustees: "ટ્રસ્ટીઓ દ્વારા મંજૂર",
    download_award_summary: "એવોર્ડ સારાંશ ડાઉનલોડ કરો (PDF)",
    active_allocations_count: "સક્રિય ફાળવણી(ઓ)",
    active_approved_grants: "સક્રિય મંજૂર અનુદાન",
    allocations_badge: "ફાળવણીઓ",
    trustee_verified_auth: "100% ટ્રસ્ટી ચકાસાયેલ અને અધિકૃત",
    filter_disbursed_active: "વિતરિત અને સક્રિય",
    btn_grant_cards: "ગ્રાન્ટ કાર્ડ્સ",
    btn_table_view: "ટેબલ વ્યૂ",
    search_assistance_placeholder: "હેતુ, ગ્રાન્ટ, સંદર્ભ શોધો...",
    alloc_details_governance: "સહાય વિગતો અને સંચાલન",
    lbl_funding_partner: "ભંડોળ ભાગીદાર:",
    lbl_supervising_caseworker: "નિરીક્ષણ કેસવર્કર:",
    lbl_disbursement_method: "ચુકવણી પદ્ધતિ:",
    lbl_trustee_authority: "ટ્રસ્ટી સત્તા:",
    lbl_permitted_use: "મંજૂર ઉપયોગ:",
    milestone_tracker_title: "વર્તમાન સ્થિતિ અને તબક્કા ટ્રેકર",
    valid_through: "સુધી માન્ય:",
    current_relief_period: "વર્તમાન રાહત સમયગાળો",
    certified_care_charter: "ઝિંથિયા ટ્રસ્ટ કેર ચાર્ટર હેઠળ પ્રમાણિત",
    btn_award_letter_pdf: "એવોર્ડ પત્ર (PDF)",
    btn_view_full_details: "સંપૂર્ણ વિગતો જુઓ →",
    view_details: "વિગતો જુઓ",
    tbl_col_allocated_amount: "ફાળવેલ રકમ",
    tbl_col_purpose_ref: "ફાળવણીનો હેતુ",
    tbl_col_alloc_date: "ફાળવણી તારીખ",
    tbl_col_current_status: "વર્તમાન સ્થિતિ",
    tbl_col_details_action: "વિગતો અને ક્રિયા",
    btn_close: "બંધ કરો",
    btn_print_notice: "ફાળવણી નોટિસ પ્રિન્ટ કરો",
    advocate_dossier_title: "સોંપાયેલ સલાહકાર ડોઝિયર",
    btn_book_appointment: "એપોઇન્ટમેન્ટ બુક કરો",
    lbl_preferred_name: "પસંદગીનું નામ / સંબોધન *",
    lbl_preferred_lang: "પસંદગીની બોલાતી અને લખાતી ભાષા",
    btn_save_personal_info: "વ્યક્તિગત માહિતી સાચવો",
    btn_save_contact_details: "સંપર્ક વિગતો સાચવો",
    "badge_support_archive": "સહાય આર્કાઇવ",
    "lbl_case_ref": "કેસ સંદર્ભ:",
    "kpi_support_received": "પ્રાપ્ત થયેલ સહાય",
    "kpi_disbursed_received": "વિતરિત અને પ્રાપ્ત થયેલ અનુદાન",
    "kpi_allocated_support": "ફાળવેલ સહાય",
    "kpi_pending_payout": "ચૂકવણી બાકી અનુદાન",
    "kpi_total_tracked": "ટ્રેક કરેલ કુલ સહાય",
    "kpi_records": "રેકોર્ડ્સ",
    "kpi_casework_ledger_active": "સત્તાવાર કેસવર્ક ખાતાવહી સક્રિય",
    "status_received": "મળેલ",
    "status_approved": "મંજૂર થયેલ",
    "th_assistance_type": "સહાયનો પ્રકાર",
    "th_amount": "રકમ",
    "th_status": "સ્થિતિ",
    "th_date": "તારીખ",
    "th_action": "ક્રિયા",
    "btn_view_details": "વિગતો જુઓ",
    "lbl_submitted_by_client": "ક્લાયન્ટ દ્વારા સબમિટ કરેલ",
    "lbl_allocated_prefix": "ફાળવેલ: ",
    "footer_certified_ledger": "{name} માટે પ્રમાણિત સત્તાવાર સહાય ખાતાવહી • UK Charity No. 1137350.",
    "milestones_title": "કેસવર્ક સીમાચિહ્નો અને સમયરેખા",
    "milestones_sub": "પરામર્શ, અનુદાન વિતરણ અને પૂર્ણ મૂલ્યાંકનનો તબક્કાવાર ઇતિહાસ.",
    "step_intake_assigned": "કેસ ઇન્ટેક અને એડવોકેટ સોંપણી",
    "step_account_active": "લાભાર્થીનું ખાતું સક્રિય અને ચકાસાયેલ છે",
    "step_intake_desc": "ઝિન્થિયા ટ્રસ્ટ પોર્ટલ પર ક્લાયન્ટ નોંધાયેલ. સમર્પિત કેસવર્કર સોંપેલ.",
    "btn_download_ledger": "સત્તાવાર સહાય ખાતાવહી ડાઉનલોડ કરો",
    "modal_assistance_details": "સહાય વિગતો",
    "lbl_allocated_funds_title": "સહાય વિનંતીઓમાંથી ફાળવેલ ભંડોળ",
    "lbl_total_allocated_prefix": "કુલ ફાળવેલ: ",
    "lbl_admin_feedback": "એડમિન સમીક્ષા નોંધો અને પ્રતિસાદ:",
    "btn_download_statement": "સ્ટેટમેન્ટ ડાઉનલોડ કરો",
    "lbl_credentials": "વ્યવસાયિક ઓળખપત્રો:",
    "lbl_badge_id": "એડવોકેટ બેજ આઈડી:",
    "lbl_office_hours": "કાર્યાલય સમય:",
    "lbl_office_loc": "ભૌતિક કાર્યાલયનું સ્થળ:",
    "lbl_casework_languages": "કેસવર્ક ભાષાઓ:",
    "lbl_advocate_bio": "એડવોકેટ પૃષ્ઠભૂમિ",
    "urgency_high": "ઉચ્ચ અગ્રતા (24-48 કલાકમાં તાત્કાલિક જરૂરિયાતો)",
    "urgency_critical": "ગંભીર કટોકટી (ત્વરિત કટોકટી)",
    "urgency_medium": "પ્રમાણભૂત સહાય (આગામી 3-5 કામકાજના દિવસો)",
    "lbl_supporting_docs": "સહાયક દસ્તાવેજો",
    "lbl_attach_docs_hint": "બીલ, પત્રો, નોટિસો, ઓળખપત્રો જોડો",
    "btn_add_supporting_docs": "+ સહાયક દસ્તાવેજો ઉમેરો (બહુવિધ મંજૂરી)",
    "profile_personal_sub": "સત્તાવાર રેકોર્ડ જુઓ અને માન્ય ઓળખ વિગતો અપડેટ કરો.",
    "lbl_full_legal_name": "સંપૂર્ણ કાનૂની નામ (સત્તાવાર રેકોર્ડ)",
    "lbl_verified_record": "ચકાસાયેલ રેકોર્ડ",
    "lbl_legal_name_hint": "તમારું સત્તાવાર કાનૂની નામ અપડેટ કરવા માટે, કેસવર્કર ઓળખ ચકાસણી જરૂરી છે.",
    "lbl_preferred_salutation": "પસંદગીનું નામ / સંબોધન *",
    "lbl_preferred_name_hint": "કેસવર્કર્સ અને સ્ટાફ તમને કેવી રીતે સંબોધે તે તમારી પસંદગી.",
    "lbl_case_reference_num": "ક્લાયન્ટ કેસ સંદર્ભ નંબર",
    "lbl_dob_verified": "જન્મ તારીખ (ચકાસાયેલ)",
    "lbl_pref_spoken_written": "પસંદગીની બોલાતી અને લખાતી ભાષા",
    "lbl_interpreter_session": "રૂબરૂ સત્રો માટે માન્ય દુભાષિયો",
    "opt_not_required": "જરૂરી નથી",
    "opt_require_interpreter": "દુભાષિયાની જરૂર છે",
    "profile_contact_sub": "કેસવર્ક અપડેટ્સ માટે તમારા ફોન નંબર, ઇમેઇલ અને કટોકટી સંપર્કનું સંચાલન કરો.",
    "lbl_primary_phone": "મુખ્ય મોબાઇલ ફોન નંબર *",
    "lbl_secondary_phone": "વૈકલ્પિક / ઘરનો લેન્ડલાઇન (વૈકલ્પિક)",
    "lbl_preferred_contact_method": "સંપર્કની પસંદગીની પદ્ધતિ",
    "lbl_best_time_to_call": "કૉલ કરવાનો શ્રેષ્ઠ સમય",
    "lbl_emergency_name": "કટોકટીના નજીકના સંબંધીનું નામ",
    "lbl_emergency_phone": "કટોકટી સંપર્ક નંબર",
    "lbl_emergency_rel": "કટોકટી સંપર્ક સાથેનો સંબંધ",
    "profile_housing_sub": "ઉપયોગિતા વાઉચર્સ, ડિલિવરી અને કાઉન્સિલ લાભો માટે તમારું સરનામું સાચું હોવાની ખાતરી કરો.",
    "lbl_proof_verified": "પુરાવો ચકાસાયેલ છે",
    "lbl_address_line1": "સરનામું લાઇન 1 (શેરી અને મકાન નંબર) *",
    "lbl_address_line2": "સરનામું લાઇન 2 (ફ્લેટ / એપાર્ટમેન્ટ - વૈકલ્પિક)",
    "lbl_city": "નગર / શહેર *",
    "lbl_postcode": "પોસ્ટકોડ *",
    "lbl_housing_tenure": "હાઉસિંગ ભાડૂઆત અને રહેવાની સ્થિતિ",
    "btn_save_address": "સરનામાંની માહિતી સાચવો",
    "profile_security_title": "સુરક્ષા અને પાસવર્ડ મેનેજમેન્ટ",
    "profile_security_sub": "તમારું એકાઉન્ટ મજબૂત, ગોપનીય પાસવર્ડથી સુરક્ષિત છે તેની ખાતરી કરો.",
    "lbl_current_pw": "વર્તમાન પાસવર્ડ *",
    "lbl_new_pw": "નવો પાસવર્ડ *",
    "lbl_confirm_new_pw": "નવા પાસવર્ડની પુષ્ટિ કરો *",
    "gdpr_notice_title": "UK GDPR ડેટા સુરક્ષા અને મંજૂર ફેરફારો",
    "gdpr_notice_desc": "તમે તમારું પસંદગીનું નામ, ફોન નંબર, સરનામું અને પાસવર્ડ જાતે અપડેટ કરી શકો છો. સત્તાવાર નામ કે જન્મતારીખ બદલવા માટે વેરિફિકેશન જરૂરી છે.",
    "online_duty_caseworker": "ઓનલાઇન • ફરજ પરના કેસવર્કર",
    "typically_replies": "ફરજના કલાકો દરમિયાન સામાન્ય રીતે 2 કલાકમાં જવાબ આપે છે",
    "btn_call_advocate": "એડવોકેટને કૉલ કરો",
    "btn_view_advocate_profile": "સંપૂર્ણ એડવોકેટ પ્રોફાઇલ જુઓ",
    "advocate_spoken_langs": "એડવોકેટ બોલાતી ભાષાઓ:",
    "btn_stop_send_voice": "અટકાવો અને વૉઇસ સંદેશ મોકલો",
    "lbl_playing_audio": "ઑડિઓ પ્લે થઈ રહ્યો છે...",
    "lbl_voice_message": "વૉઇસ સંદેશ",
    "lbl_show_orig_transcript": "મૂળ ઑડિઓ ટ્રાન્સક્રિપ્ટ બતાવો",
    "lbl_translate_transcript": "ઑડિઓ ટ્રાન્સક્રિપ્ટ અનુવાદ કરો",
    "lbl_translating": "અનુવાદ થઈ રહ્યો છે...",
    "lbl_recording_voice": "વૉઇસ નોટ રેકોર્ડ થઈ રહી છે...",
    "urgent_emergency_title": "તાત્કાલિક કટોકટી કેસવર્ક?",
    "urgent_emergency_desc": "જો તમારો ઊર્જા પુરવઠો ડિસ્કનેક્ટ થયો હોય અથવા તાત્કાલિક આશ્રયની જરૂર હોય, તો 0116 254 5168 પર તરત જ કૉલ કરો.",
    "msg_pw_changed_success": "તમારો પાસવર્ડ સફળતાપૂર્વક બદલાઈ ગયો છે.",
    "btn_save": "સાચવો",
    "lbl_show_original": "મૂળ સંદેશ બતાવો",
    "lbl_show_orig_en": "મૂળ બતાવો (અંગ્રેજી)",
    "btn_translate_into": "માં અનુવાદ કરો",
    "lbl_note_relocating": "સ્થળાંતર માટે નોંધ:",
    "desc_note_relocating": "જો તમે નવી મિલકતમાં જાઓ છો, તો તમારું સરનામું અપડેટ કરવાથી ફૂડ હેમ્પર્સ અને ઉપયોગિતા વાઉચર્સ તમારા વર્તમાન ઘરે પહોંચાડવામાં આવે છે.",
    "lbl_app_stage": "અરજીનો તબક્કો",
    "lbl_award_amount": "પુરસ્કાર રકમ",
    "lbl_reference_id": "સંદર્ભ આઈડી",
    "lbl_submitted_for_approval": "તમે એડમિન મંજૂરી માટે સબમિટ કરેલ:",
    "lbl_assistance_notes": "સહાયતા ક્ષેત્ર અને નોંધો:",
    "lbl_supporting_docs_approval": "મંજૂરી માટે આપેલા સહાયક દસ્તાવેજો",
    "btn_view_file": "ફાઇલ જુઓ",
    "lbl_linked_allocations": "લિંક કરેલ સહાય ફાળવણી",
    "lbl_total_colon": "કુલ:",
    "lbl_intake_case_ref": "કેસ સંદર્ભ હેઠળ નોંધાયેલ ઇન્ટેક:",
    "badge_recorded": "નોંધાયેલ",
  },

  hi: {
    lbl_effective_date: "प्रभावी:",
    lbl_email_address: "पंजीकृत ईमेल पता *",
    modal_allocation_cert_notice: "यह सहायता पैकेज आधिकारिक रूप से लाभार्थी के लिए द ज़िंथिया ट्रस्ट द्वारा समीक्षा और अधिकृत किया गया है",
    effective_date_label: "प्रभावी / भुगतान तिथि",
    funding_auth_label: "फंडिंग पार्टनर और प्राधिकरण",
    permitted_terms_label: "अनुमत उपयोग और शर्तें",
    conversations_sub: "सक्रिय केसवर्क चर्चाओं और पिछली सहायता अभिलेखों के बीच स्विच करें।",
    advocate_info_btn: "सलाहकार विवरण और डायरेक्ट हेल्पलाइन →",
    no_notifications_sub: "कोई सक्रिय अलर्ट नहीं है। आपके आपातकालीन अनुदान, आवेदनों और केसवर्कर संदेशों के सत्यापित अपडेट वास्तविक समय में यहां प्रदर्शित होंगे।",

    // Nav
    portal_badge: "लाभार्थी पोर्टल",
    nav_dashboard: "डैशबोर्ड",
    nav_profile: "मेरी प्रोफाइल",
    nav_assistance: "आवंटित सहायता",
    nav_history: "सहायता इतिहास",
    nav_messages: "संदेश / सलाहकार",
    nav_notifications: "सूचनाएं",
    nav_language: "भाषा सेटिंग्स",
    nav_logout: "लॉग आउट",
    helpline_title: "केसवर्क हेल्पलाइन",
    helpline_hours: "सोम - शुक्र, सुबह 9:00 - शाम 4:30",

    // Header
    client_care_portal: "क्लाइंट केयर पोर्टल",
    caseworker_prefix: "केसवर्कर:",
    crisis_advocate_badge: "समर्पित संकट सलाहकार",
    btn_request_support: "+ सहायता का अनुरोध करें",
    btn_logout: "लॉग आउट",

    // Dashboard
    welcome_back: "वापसी पर स्वागत है",
    active_beneficiary: "सक्रिय लाभार्थी",
    case_ref: "केस संदर्भ:",
    gdpr_verified: "UK GDPR सत्यापित खाता",
    display_currency: "मुद्रा प्रदर्शित करें:",
    registered_contact: "पंजीकृत संपर्क",
    registered_home_address: "पंजीकृत घर का पता",
    dedicated_worker: "समर्पित संकट कार्यकर्ता",
    case_support_status: "केस सहायता स्थिति",
    active_support: "सक्रिय सहायता",
    stat_total_allocated: "कुल आवंटित सहायता",
    stat_distributed: "अब तक वितरित",
    stat_pending_payout: "लंबित सहायता भुगतान",
    stat_pending_requests: "लंबित आवेदन",
    stat_caseworker: "समर्पित केसवर्कर",
    stat_unread_messages: "अपठित संदेश",
    quick_actions: "त्वरित कार्रवाई",
    qa_send_message: "केसवर्कर को संदेश भेजें",
    qa_view_grants: "अनुदान और आवंटन देखें",
    qa_emergency_line: "आपातकालीन कठिनाई लाइन",
    recent_activity: "हाल की केस गतिविधि और अलर्ट",
    no_recent_activity: "कोई हालिया गतिविधि दर्ज नहीं है।",
    active_allocations_title: "सक्रिय आवंटन",
    no_active_allocations: "कोई सक्रिय आवंटन नहीं मिला।",
    view_all: "सभी देखें",

    // Profile
    profile_title: "क्लाइंट प्रोफाइल और केयर डोजियर",
    profile_subtitle: "आपके सत्यापित क्लाइंट पंजीकरण विवरण, सौंपे गए सलाहकार और आपातकालीन संपर्क।",
    personal_details: "व्यक्तिगत विवरण",
    full_name: "पूरा नाम",
    client_ref: "क्लाइंट संदर्भ संख्या",
    dob: "जन्म तिथि",
    gender: "लिंग",
    primary_language: "प्राथमिक भाषा",
    contact_details: "संपर्क विवरण",
    email_address: "ईमेल पता",
    phone_number: "फ़ोन नंबर",
    residential_address: "आवासीय पता",
    council_area: "काउंसिल क्षेत्र",
    emergency_contact: "आपातकालीन संपर्क",
    next_of_kin: "परिजन / संपर्क नाम",
    emergency_phone: "आपातकालीन फ़ोन नंबर",
    casework_assignment: "केसवर्क असाइनमेंट",
    assigned_advocate: "सौंपा गया सलाहकार",
    secondary_worker: "ड्यूटी वेलफेयर एडवोकेट",
    case_status: "केस स्थिति",
    support_type: "सहायता प्रकार",
    household_size: "परिवार का आकार",
    change_password: "पोर्टल पासवर्ड बदलें",
    current_password: "वर्तमान पासवर्ड",
    new_password: "नया पासवर्ड",
    confirm_new_password: "नए पासवर्ड की पुष्टि करें",
    btn_update_password: "पासवर्ड अपडेट करें",

    // Allocated Assistance
    assistance_title: "आवंटित सहायता और अनुदान रिकॉर्ड",
    assistance_subtitle: "द ज़िंथिया ट्रस्ट द्वारा अनुमोदित वित्तीय और आपातकालीन सहायता।",
    filter_all: "सभी स्वीकृत",
    filter_pending: "लंबित भुगतान",
    filter_distributed: "वितरित",
    alloc_amount: "आवंटित सहायता राशि",
    alloc_date: "आवंटन तिथि",
    alloc_purpose: "आवंटन का उद्देश्य",
    alloc_method: "संवितरण विधि",
    alloc_award_letter: "स्वीकृति पत्र (PDF)",
    download_pdf: "आधिकारिक आवंटन नोटिस PDF डाउनलोड हो रहा है...",
    no_allocations_found: "इस फ़िल्टर से मेल खाता कोई आवंटन नहीं मिला।",

    // Support History
    history_title: "सहायता इतिहास और आवेदन लॉग",
    history_subtitle: "अपने पिछले और सक्रिय सहायता आवेदनों और स्थिति को ट्रैक करें।",
    col_category: "सेवा / आवश्यकता श्रेणी",
    col_date: "आवेदन तिथि",
    col_urgency: "तात्कालिकता स्तर",
    col_status: "स्थिति",
    col_worker: "सौंपा गया कार्यकर्ता",
    col_notes: "आवेदन नोट्स",
    no_history_records: "कोई सहायता आवेदन दर्ज नहीं है।",

    // Messages / Advocate
    translation_banner_title: "स्वचालित भाषा पहचान और रीयल-टाइम अनुवाद",
    translation_banner_sub: "अपनी मूल भाषा में लिखें। संदेश आपके सलाहकार के लिए स्वचालित रूप से अनुवादित होते हैं।",
    translate_into: "इसमें अनुवाद करें:",
    auto_translate: "स्वतः अनुवाद",
    btn_request_interpreter: "+ लाइव दुभाषिया का अनुरोध करें",
    interpreter_requested: "दुभाषिया का अनुरोध किया गया",
    threads_title: "बातचीत और केसवर्क थ्रेड्स",
    active_thread_title: "केसवर्क वकालत और सीधा संदेश",
    direct_caseworker: "प्रत्यक्ष केसवर्कर:",
    gdpr_encrypted: "UK GDPR 256-बिट एन्क्रिप्टेड",
    encrypted_banner: "इस थ्रेड के संदेश यूके चैरिटी कानून के तहत गोपनीय और एन्क्रिप्टेड हैं।",
    no_messages_yet: "अभी तक कोई संदेश नहीं",
    no_messages_sub: "अपने केसवर्कर के साथ सीधे बातचीत शुरू करने के लिए नीचे संदेश या वॉयस नोट भेजें।",
    chat_placeholder: "अपने केसवर्कर को एक संदेश लिखें (या अपनी भाषा में लिखें)...",
    btn_send: "भेजें",
    btn_voice_note: "वॉयस नोट",
    recording_text: "वॉयस रिकॉर्डिंग जारी है...",
    btn_stop_record: "रोकें और संलग्न करें",
    btn_translate_msg: "संदेश का अनुवाद करें",
    original_text: "मूल पाठ:",
    original_audio_transcript: "मूल ऑडियो प्रतिलेख:",

    // Notifications
    notifications_title: "सूचनाएं और केस अलर्ट",
    notifications_subtitle: "आपके सहायता आवेदनों, अनुदान आवंटन और संदेशों पर हाल के अपडेट।",
    btn_mark_all_read: "सभी को पढ़ा हुआ चिह्नित करें",
    no_notifications: "कोई नई सूचना नहीं",

    // Language Settings
    lang_settings_title: "भाषा सेटिंग्स और दुभाषिया प्राथमिकताएं",
    lang_settings_subtitle: "अपनी पसंदीदा भाषा चुनें। ज़िंथिया ट्रस्ट सभी पत्राचार और बैठकों के लिए मान्यता प्राप्त अनुवाद प्रदान करता है।",
    btn_save_language: "भाषा चयन सहेजें",
    toast_lang_saved: "भाषा प्राथमिकताएं सफलतापूर्वक अपडेट की गईं। संपूर्ण पोर्टल सामग्री अब आपकी चुनी हुई भाषा में प्रदर्शित है।",

    // Modals
    modal_request_title: "सहायता या आपातकालीन सहायता का अनुरोध करें",
    modal_request_sub: "आपका अनुरोध सीधे सौंपे गए केसवर्कर के पास जाता है",
    form_category: "सहायता श्रेणी *",
    form_urgency: "तात्कालिकता स्तर *",
    form_notes: "संक्षिप्त विवरण / आपको क्या चाहिए *",
    form_notes_placeholder: "आपको तत्काल क्या चाहिए, इसके बारे में संक्षिप्त विवरण दें...",
    btn_cancel: "रद्द करें",
    btn_submit_request: "अनुरोध सबमिट करें",
    submitting: "सबमिट किया जा रहा है...",
    modal_logout_title: "लॉग आउट की पुष्टि करें",
    modal_logout_desc: "क्या आप वाकई लाभार्थी पोर्टल से लॉग आउट करना चाहते हैं?",
    kpi_distributed_sub: "कुल स्वीकृत और वितरित समुदाय राहत सहायता।",
    kpi_allocated_sub: "वर्तमान सक्रिय अनुदान और पूर्ति के अधीन सहायता।",
    advocate_details_title: "सौंपे गए सलाहकार का विवरण",
    active_advocate_badge: "सक्रिय सलाहकार",
    advocate_role_title: "वरिष्ठ परिवार कल्याण एवं संकट सलाहकार",
    available_today: "• आज परामर्श के लिए उपलब्ध",
    direct_helpline_label: "सीधी हेल्पलाइन:",
    duty_email_label: "ड्यूटी ईमेल:",
    duty_hours_text: "ड्यूटी का समय: सोम – शुक्र, सुबह 9:00 – शाम 4:30",
    btn_message_caseworker: "केसवर्कर को संदेश भेजें",
    btn_call_caseworker: "केसवर्कर को कॉल करें",
    tab_recent_messages: "हाल के संदेश",
    tab_notifications: "सूचनाएं",
    view_all_arrow: "सभी देखें →",
    duty_office_badge: "ड्यूटी कार्यालय",
    welcome_portal_message: "\"ज़िन्थिया ट्रस्ट क्लाइंट पोर्टल में आपका स्वागत है। आप अपनी केस फ़ाइल की समीक्षा कर सकते हैं, आवंटित सहायता की जांच कर सकते हैं, या आपातकालीन सहायता का अनुरोध कर सकते हैं।\"",
    btn_open_advocate_thread: "सलाहकार संदेश थ्रेड खोलें →",
    no_active_notifications: "कोई सक्रिय सूचनाएं दर्ज नहीं हैं।",
    filter_all_records: "सभी रिकॉर्ड",
    filter_received: "प्राप्त",
    filter_approved: "स्वीकृत",
    filter_cancelled: "रद्द",
    filter_completed: "पूर्ण",
    tab_applied_requests: "आवेदित अनुरोध",
    col_assistance_type: "सहायता का प्रकार",
    col_amount: "राशि",
    col_action: "कार्रवाई",
    is_typing: "टाइप कर रहे हैं...",
    approved_by_trustees: "ट्रस्टियों द्वारा स्वीकृत",
    download_award_summary: "अनुदान सारांश डाउनलोड करें (PDF)",
    active_allocations_count: "सक्रिय आवंटन",
    active_approved_grants: "सक्रिय स्वीकृत अनुदान",
    allocations_badge: "आवंटन",
    trustee_verified_auth: "100% ट्रस्टी सत्यापित एवं अधिकृत",
    filter_disbursed_active: "वितरित एवं सक्रिय",
    btn_grant_cards: "अनुदान कार्ड",
    btn_table_view: "तालिका दृश्य",
    search_assistance_placeholder: "उद्देश्य, अनुदान, संदर्भ खोजें...",
    alloc_details_governance: "सहायता विवरण एवं शासन",
    lbl_funding_partner: "फंडिंग पार्टनर:",
    lbl_supervising_caseworker: "पर्यवेक्षी केसवर्कर:",
    lbl_disbursement_method: "वितरण विधि:",
    lbl_trustee_authority: "ट्रस्टी प्राधिकरण:",
    lbl_permitted_use: "अनुमत उपयोग:",
    milestone_tracker_title: "वर्तमान स्थिति एवं चरण ट्रैकर",
    valid_through: "तक मान्य:",
    current_relief_period: "वर्तमान राहत अवधि",
    certified_care_charter: "ज़िन्थिया ट्रस्ट केयर चार्टर के तहत प्रमाणित",
    btn_award_letter_pdf: "अनुदान पत्र (PDF)",
    btn_view_full_details: "पूरा विवरण देखें →",
    view_details: "विवरण देखें",
    tbl_col_allocated_amount: "आवंटित राशि",
    tbl_col_purpose_ref: "आवंटन का उद्देश्य",
    tbl_col_alloc_date: "आवंटन तिथि",
    tbl_col_current_status: "वर्तमान स्थिति",
    tbl_col_details_action: "विवरण एवं कार्रवाई",
    btn_close: "बंद करें",
    btn_print_notice: "आवंटन नोटिस प्रिंट करें",
    advocate_dossier_title: "सौंपे गए सलाहकार का दस्तावेज़",
    btn_book_appointment: "अपॉइंटमेंट बुक करें",
    lbl_preferred_name: "पसंदीदा नाम / संबोधन *",
    lbl_preferred_lang: "पसंदीदा बोली और लिखित भाषा",
    btn_save_personal_info: "व्यक्तिगत जानकारी सहेजें",
    btn_save_contact_details: "संपर्क विवरण सहेजें",
    "badge_support_archive": "सहायता पुरालेख",
    "lbl_case_ref": "केस संदर्भ:",
    "kpi_support_received": "प्राप्त सहायता",
    "kpi_disbursed_received": "संवितरित और प्राप्त अनुदान",
    "kpi_allocated_support": "आवंटित सहायता",
    "kpi_pending_payout": "भुगतान लंबित अनुदान",
    "kpi_total_tracked": "कुल ट्रैक की गई सहायता",
    "kpi_records": "रिकॉर्ड",
    "kpi_casework_ledger_active": "आधिकारिक केसवर्क बहीखाता सक्रिय",
    "status_received": "प्राप्त हुआ",
    "status_approved": "स्वीकृत",
    "th_assistance_type": "सहायता का प्रकार",
    "th_amount": "राशि",
    "th_status": "स्थिति",
    "th_date": "तारीख",
    "th_action": "कार्रवाई",
    "btn_view_details": "विवरण देखें",
    "lbl_submitted_by_client": "क्लाइंट द्वारा प्रस्तुत",
    "lbl_allocated_prefix": "आवंटित: ",
    "footer_certified_ledger": "{name} के लिए प्रमाणित आधिकारिक सहायता बहीखाता • UK Charity No. 1137350.",
    "milestones_title": "केसवर्क मील के पत्थर और समयरेखा",
    "milestones_sub": "परामर्श, अनुदान वितरण और पूर्ण मूल्यांकनों का चरणबद्ध इतिहास।",
    "step_intake_assigned": "केस प्रवेश और अधिवक्ता असाइनमेंट",
    "step_account_active": "लाभार्थी खाता सक्रिय और सत्यापित है",
    "step_intake_desc": "ज़िंथिया ट्रस्ट पोर्टल पर पंजीकृत ग्राहक। समर्पित केसवर्कर नियुक्त।",
    "btn_download_ledger": "आधिकारिक सहायता बहीखाता डाउनलोड करें",
    "modal_assistance_details": "सहायता विवरण",
    "lbl_allocated_funds_title": "सहायता अनुरोधों से आवंटित धन",
    "lbl_total_allocated_prefix": "कुल आवंटित: ",
    "lbl_admin_feedback": "व्यवस्थापक समीक्षा नोट्स और प्रतिक्रिया:",
    "btn_download_statement": "विवरण डाउनलोड करें",
    "lbl_credentials": "व्यावसायिक साख:",
    "lbl_badge_id": "अधिवक्ता बैज आईडी:",
    "lbl_office_hours": "कार्यालय समय:",
    "lbl_office_loc": "भौतिक कार्यालय स्थान:",
    "lbl_casework_languages": "केसवर्क भाषाएं:",
    "lbl_advocate_bio": "अधिवक्ता पृष्ठभूमि",
    "urgency_high": "उच्च प्राथमिकता (24-48 घंटों के भीतर तत्काल आवश्यकताएं)",
    "urgency_critical": "गंभीर आपातकाल (तत्काल संकट)",
    "urgency_medium": "मानक सहायता (अगले 3-5 कार्य दिवस)",
    "lbl_supporting_docs": "सहायक दस्तावेज",
    "lbl_attach_docs_hint": "बिल, पत्र, नोटिस, पहचान पत्र संलग्न करें",
    "btn_add_supporting_docs": "+ सहायक दस्तावेज जोड़ें (एकाधिक अनुमत)",
    "profile_personal_sub": "आधिकारिक रिकॉर्ड देखें और स्वीकृत पहचान विवरण अपडेट करें।",
    "lbl_full_legal_name": "पूर्ण कानूनी नाम (आधिकारिक रिकॉर्ड)",
    "lbl_verified_record": "सत्यापित रिकॉर्ड",
    "lbl_legal_name_hint": "अपना आधिकारिक कानूनी नाम अपडेट करने के लिए, केसवर्कर पहचान सत्यापन आवश्यक है।",
    "lbl_preferred_salutation": "पसंदीदा नाम / अभिवादन *",
    "lbl_preferred_name_hint": "आप कैसे चाहते हैं कि केसवर्कर और कर्मचारी आपको संबोधित करें।",
    "lbl_case_reference_num": "क्लाइंट केस संदर्भ संख्या",
    "lbl_dob_verified": "जन्म तिथि (सत्यापित)",
    "lbl_pref_spoken_written": "पसंदीदा बोली जाने वाली और लिखित भाषा",
    "lbl_interpreter_session": "व्यक्तिगत सत्रों के लिए मान्यता प्राप्त दुभाषिया",
    "opt_not_required": "आवश्यक नहीं",
    "opt_require_interpreter": "दुभाषिया आवश्यक",
    "profile_contact_sub": "केसवर्क अपडेट के लिए अपने फोन नंबर, ईमेल और आपातकालीन संपर्क का प्रबंधन करें।",
    "lbl_primary_phone": "प्राथमिक मोबाइल फोन नंबर *",
    "lbl_secondary_phone": "वैकल्पिक / घरेलू लैंडलाइन (वैकल्पिक)",
    "lbl_preferred_contact_method": "पसंदीदा संपर्क विधि",
    "lbl_best_time_to_call": "कॉल करने का सर्वोत्तम समय",
    "lbl_emergency_name": "आपातकालीन निकटतम संबंधी का नाम",
    "lbl_emergency_phone": "आपातकालीन संपर्क नंबर",
    "lbl_emergency_rel": "आपातकालीन संपर्क के साथ संबंध",
    "profile_housing_sub": "यूटिलिटी वाउचर, डिलीवरी और काउंसिल लाभों के लिए अपना पता सही रखें।",
    "lbl_proof_verified": "प्रमाण सत्यापित",
    "lbl_address_line1": "पता पंक्ति 1 (सड़क और मकान नंबर) *",
    "lbl_address_line2": "पता पंक्ति 2 (फ्लैट / अपार्टमेंट - वैकल्पिक)",
    "lbl_city": "कस्बा / शहर *",
    "lbl_postcode": "पिन कोड *",
    "lbl_housing_tenure": "आवास स्वामित्व और रहने की स्थिति",
    "btn_save_address": "पते की जानकारी सहेजें",
    "profile_security_title": "सुरक्षा और पासवर्ड प्रबंधन",
    "profile_security_sub": "सुनिश्चित करें कि आपका खाता एक मजबूत, गोपनीय पासवर्ड से सुरक्षित है।",
    "lbl_current_pw": "वर्तमान पासवर्ड *",
    "lbl_new_pw": "नया पासवर्ड *",
    "lbl_confirm_new_pw": "नए पासवर्ड की पुष्टि करें *",
    "gdpr_notice_title": "UK GDPR डेटा सुरक्षा और स्वीकृत परिवर्तन",
    "gdpr_notice_desc": "आप अपना पसंदीदा नाम, फोन नंबर, पता और पासवर्ड कभी भी अपडेट कर सकते हैं। कानूनी नाम या जन्मतिथि बदलने के लिए सत्यापन आवश्यक है।",
    "online_duty_caseworker": "ऑनलाइन • ड्यूटी केसवर्कर",
    "typically_replies": "ड्यूटी के घंटों के दौरान आमतौर पर 2 घंटे के भीतर जवाब देता है",
    "btn_call_advocate": "अधिवक्ता को कॉल करें",
    "btn_view_advocate_profile": "पूर्ण अधिवक्ता प्रोफ़ाइल देखें",
    "advocate_spoken_langs": "अधिवक्ता द्वारा बोली जाने वाली भाषाएं:",
    "btn_stop_send_voice": "रोकें और वॉयस नोट भेजें",
    "lbl_playing_audio": "ऑडियो चल रहा है...",
    "lbl_voice_message": "वॉयस संदेश",
    "lbl_show_orig_transcript": "मूल ऑडियो प्रतिलेख दिखाएं",
    "lbl_translate_transcript": "ऑडियो प्रतिलेख का अनुवाद करें",
    "lbl_translating": "अनुवाद हो रहा है...",
    "lbl_recording_voice": "वॉयस नोट रिकॉर्ड हो रहा है...",
    "urgent_emergency_title": "तत्काल आपातकालीन केसवर्क?",
    "urgent_emergency_desc": "यदि आपकी ऊर्जा आपूर्ति कट गई है या आपको तत्काल संकट आश्रय की आवश्यकता है, तो 0116 254 5168 पर कॉल करें।",
    "msg_pw_changed_success": "आपका पासवर्ड सफलतापूर्वक बदल दिया गया है।",
    "btn_save": "सहेजें",
    "lbl_show_original": "मूल संदेश दिखाएं",
    "lbl_show_orig_en": "मूल दिखाएं (अंग्रेजी)",
    "btn_translate_into": "में अनुवाद करें",
    "lbl_note_relocating": "स्थानांतरण के लिए नोट:",
    "desc_note_relocating": "यदि आप नए घर में जाते हैं, तो ऊपर अपना पता अपडेट करने से यह सुनिश्चित होता है कि सहायता आपके वर्तमान घर पर भेजी जाए।",
    "lbl_app_stage": "आवेदन का चरण",
    "lbl_award_amount": "अनुदान राशि",
    "lbl_reference_id": "संदर्भ आईडी",
    "lbl_submitted_for_approval": "व्यवस्थापक अनुमोदन के लिए प्रस्तुत:",
    "lbl_assistance_notes": "सहायता का दायरा और नोट्स:",
    "lbl_supporting_docs_approval": "अनुमोदन के लिए दिए गए सहायक दस्तावेज",
    "btn_view_file": "फ़ाइल देखें",
    "lbl_linked_allocations": "लिंक किए गए सहायता आवंटन",
    "lbl_total_colon": "कुल:",
    "lbl_intake_case_ref": "केस संदर्भ के तहत पंजीकृत प्रवेश:",
    "badge_recorded": "दर्ज किया गया",
  },

  pa: {
    lbl_effective_date: "ਪ੍ਰਭਾਵੀ:",
    lbl_email_address: "ਰਜਿਸਟਰਡ ਈਮੇਲ ਪਤਾ *",
    modal_allocation_cert_notice: "ਇਹ ਸਹਾਇਤਾ ਪੈਕੇਜ ਦ ਜ਼ਿੰਥੀਆ ਟਰੱਸਟ ਦੁਆਰਾ ਲਾਭਪਾਤਰੀ ਲਈ ਰਸਮੀ ਤੌਰ 'ਤੇ ਸਮੀਖਿਆ ਅਤੇ ਪ੍ਰਮਾਣਿਤ ਕੀਤਾ ਗਿਆ ਹੈ",
    effective_date_label: "ਪ੍ਰਭਾਵੀ / ਭੁਗਤਾਨ ਮਿਤੀ",
    funding_auth_label: "ਫੰਡਿੰਗ ਪਾਰਟਨਰ ਅਤੇ ਪ੍ਰਮਾਣੀਕਰਨ",
    permitted_terms_label: "ਮਨਜ਼ੂਰ ਵਰਤੋਂ ਅਤੇ ਸ਼ਰਤਾਂ",
    conversations_sub: "ਸਰਗਰਮ ਕੇਸਵਰਕ ਚਰਚਾਵਾਂ ਅਤੇ ਪਿਛਲੇ ਹੱਲ ਕੀਤੇ ਸਹਾਇਤਾ ਰਿਕਾਰਡਾਂ ਵਿਚਕਾਰ ਬਦਲੋ।",
    advocate_info_btn: "ਸਲਾਹਕਾਰ ਜਾਣਕਾਰੀ ਅਤੇ ਸਿੱਧੀ ਲਾਈਨ →",
    no_notifications_sub: "ਕੋਈ ਸਰਗਰਮ ਚਿਤਾਵਨੀ ਨਹੀਂ ਹੈ। ਤੁਹਾਡੀਆਂ ਐਮਰਜੈਂਸੀ ਗ੍ਰਾਂਟਾਂ, ਅਰਜ਼ੀਆਂ ਅਤੇ ਕੇਸਵਰਕਰ ਸੰਦੇਸ਼ਾਂ ਦੇ ਅਪਡੇਟ ਇੱਥੇ ਰੀਅਲ-ਟਾਈਮ ਵਿੱਚ ਦਿਖਾਈ ਦੇਣਗੇ।",

    // Nav
    portal_badge: "ਲਾਭਪਾਤਰੀ ਪੋਰਟਲ",
    nav_dashboard: "ਡੈਸ਼ਬੋਰਡ",
    nav_profile: "ਮੇਰਾ ਪ੍ਰੋਫਾਈਲ",
    nav_assistance: "ਵੰਡੀ ਗਈ ਸਹਾਇਤਾ",
    nav_history: "ਸਹਾਇਤਾ ਇਤਿਹਾਸ",
    nav_messages: "ਸੁਨੇਹੇ / ਐਡਵੋਕੇਟ",
    nav_notifications: "ਸੂਚਨਾਵਾਂ",
    nav_language: "ਭਾਸ਼ਾ ਸੈਟਿੰਗਾਂ",
    nav_logout: "ਲਾੱਗ ਆਉਟ",
    helpline_title: "ਕੇਸਵਰਕ ਹੈਲਪਲਾਈਨ",
    helpline_hours: "ਸੋਮ - ਸ਼ੁੱਕਰ, ਸਵੇਰੇ 9:00 - ਸ਼ਾਮ 4:30",

    // Header
    client_care_portal: "ਕਲਾਇੰਟ ਕੇਅਰ ਪੋਰਟਲ",
    caseworker_prefix: "ਕੇਸਵਰਕਰ:",
    crisis_advocate_badge: "ਸਮਰਪਿਤ ਸੰਕਟ ਸਲਾਹਕਾਰ",
    btn_request_support: "+ ਸਹਾਇਤਾ ਲਈ ਬੇਨਤੀ ਕਰੋ",
    btn_logout: "ਲਾੱਗ ਆਉਟ",

    // Dashboard
    welcome_back: "ਜੀ ਆਇਆਂ ਨੂੰ",
    active_beneficiary: "ਸਰਗਰਮ ਲਾਭਪਾਤਰੀ",
    case_ref: "ਕੇਸ ਰੈਫਰੈਂਸ:",
    gdpr_verified: "UK GDPR ਪ੍ਰਮਾਣਿਤ ਖਾਤਾ",
    display_currency: "ਕਰੰਸੀ ਦਿਖਾਓ:",
    registered_contact: "ਰਜਿਸਟਰਡ ਸੰਪਰਕ",
    registered_home_address: "ਰਜਿਸਟਰਡ ਘਰ ਦਾ ਪਤਾ",
    dedicated_worker: "ਸਮਰਪਿਤ ਸੰਕਟ ਵਰਕਰ",
    case_support_status: "ਸਹਾਇਤਾ ਸਥਿਤੀ",
    active_support: "ਸਰਗਰਮ ਸਹਾਇਤਾ",
    stat_total_allocated: "ਕੁੱਲ ਵੰਡੀ ਗਈ ਸਹਾਇਤਾ",
    stat_distributed: "ਹੁਣ ਤੱਕ ਵੰਡੀ ਗਈ",
    stat_pending_payout: "ਬਕਾਇਆ ਸਹਾਇਤਾ ਭੁਗਤਾਨ",
    stat_pending_requests: "ਬਕਾਇਆ ਅਰਜ਼ੀਆਂ",
    stat_caseworker: "ਸਮਰਪਿਤ ਕੇਸਵਰਕਰ",
    stat_unread_messages: "ਅਣਪੜ੍ਹੇ ਸੁਨੇਹੇ",
    quick_actions: "ਤੁਰੰਤ ਕਾਰਵਾਈਆਂ",
    qa_send_message: "ਕੇਸਵਰਕਰ ਨੂੰ ਸੁਨੇਹਾ ਭੇਜੋ",
    qa_view_grants: "ਗ੍ਰਾਂਟ ਅਤੇ ਵੰਡ ਵੇਖੋ",
    qa_emergency_line: "ਐਮਰਜੈਂਸੀ ਹੈਲਪਲਾਈਨ",
    recent_activity: "ਤਾਜ਼ਾ ਗਤੀਵਿਧੀਆਂ ਅਤੇ ਚੇਤਾਵਨੀਆਂ",
    no_recent_activity: "ਕੋਈ ਤਾਜ਼ਾ ਗਤੀਵਿਧੀ ਦਰਜ ਨਹੀਂ ਹੈ।",
    active_allocations_title: "ਸਰਗਰਮ ਵੰਡ",
    no_active_allocations: "ਕੋਈ ਸਰਗਰਮ ਵੰਡ ਨਹੀਂ ਮਿਲੀ।",
    view_all: "ਸਭ ਵੇਖੋ",

    // Profile
    profile_title: "ਕਲਾਇੰਟ ਪ੍ਰੋਫਾਈਲ ਅਤੇ ਕੇਅਰ ਦਸਤਾਵੇਜ਼",
    profile_subtitle: "ਤੁਹਾਡੇ ਪ੍ਰਮਾਣਿਤ ਵੇਰਵੇ, ਨਿਰਧਾਰਤ ਸਲਾਹਕਾਰ ਅਤੇ ਐਮਰਜੈਂਸੀ ਸੰਪਰਕ।",
    personal_details: "ਨਿੱਜੀ ਵੇਰਵੇ",
    full_name: "ਪੂਰਾ ਨਾਮ",
    client_ref: "ਕਲਾਇੰਟ ਰੈਫਰੈਂਸ ਨੰਬਰ",
    dob: "ਜਨਮ ਮਿਤੀ",
    gender: "ਲਿੰਗ",
    primary_language: "ਮੁੱਢਲੀ ਭਾਸ਼ਾ",
    contact_details: "ਸੰਪਰਕ ਵੇਰਵੇ",
    email_address: "ਈਮੇਲ ਪਤਾ",
    phone_number: "ਫ਼ੋਨ ਨੰਬਰ",
    residential_address: "ਰਿਹਾਇਸ਼ੀ ਪਤਾ",
    council_area: "ਕੌਂਸਲ ਖੇਤਰ",
    emergency_contact: "ਐਮਰਜੈਂਸੀ ਸੰਪਰਕ",
    next_of_kin: "ਨੇੜਲਾ ਰਿਸ਼ਤੇਦਾਰ",
    emergency_phone: "ਐਮਰਜੈਂਸੀ ਫ਼ੋਨ",
    casework_assignment: "ਕੇਸਵਰਕ ਅਸਾਈਨਮੈਂਟ",
    assigned_advocate: "ਨਿਰਧਾਰਤ ਸਲਾਹਕਾਰ",
    secondary_worker: "ਡਿਊਟੀ ਵੈਲਫੇਅਰ ਐਡਵੋਕੇਟ",
    case_status: "ਕੇਸ ਸਥਿਤੀ",
    support_type: "ਸਹਾਇਤਾ ਕਿਸਮ",
    household_size: "ਘਰ ਦੇ ਜੀਅ",
    change_password: "ਪਾਸਵਰਡ ਬਦਲੋ",
    current_password: "ਮੌਜੂਦਾ ਪਾਸਵਰਡ",
    new_password: "ਨਵਾਂ ਪਾਸਵਰਡ",
    confirm_new_password: "ਨਵੇਂ ਪਾਸਵਰਡ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ",
    btn_update_password: "ਪਾਸਵਰਡ ਅਪਡੇਟ ਕਰੋ",

    // Allocated Assistance
    assistance_title: "ਵੰਡੀ ਗਈ ਸਹਾਇਤਾ ਅਤੇ ਗ੍ਰਾਂਟ ਰਿਕਾਰਡ",
    assistance_subtitle: "ਜ਼ਿੰਥੀਆ ਟਰੱਸਟ ਦੁਆਰਾ ਮਨਜ਼ੂਰਸ਼ੁਦਾ ਵਿੱਤੀ ਅਤੇ ਐਮਰਜੈਂਸੀ ਸਹਾਇਤਾ।",
    filter_all: "ਸਭ ਮਨਜ਼ੂਰਸ਼ੁਦਾ",
    filter_pending: "ਬਕਾਇਆ ਭੁਗਤਾਨ",
    filter_distributed: "ਵੰਡਿਆ ਗਿਆ",
    alloc_amount: "ਸਹਾਇਤਾ ਰਕਮ",
    alloc_date: "ਵੰਡ ਮਿਤੀ",
    alloc_purpose: "ਵੰਡ ਦਾ ਮਕਸਦ",
    alloc_method: "ਭੁਗਤਾਨ ਢੰਗ",
    alloc_award_letter: "ਮਨਜ਼ੂਰੀ ਪੱਤਰ (PDF)",
    download_pdf: "ਸਰਕਾਰੀ ਨੋਟਿਸ PDF ਡਾਊਨਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...",
    no_allocations_found: "ਕੋਈ ਵੰਡ ਨਹੀਂ ਮਿਲੀ।",

    // Support History
    history_title: "ਸਹਾਇਤਾ ਇਤਿਹਾਸ ਅਤੇ ਲਾਗ",
    history_subtitle: "ਆਪਣੀਆਂ ਪਿਛਲੀਆਂ ਅਤੇ ਚੱਲ ਰਹੀਆਂ ਅਰਜ਼ੀਆਂ ਨੂੰ ਟਰੈਕ ਕਰੋ।",
    col_category: "ਸੇਵਾ / ਲੋੜ ਸ਼੍ਰੇਣੀ",
    col_date: "ਅਰਜ਼ੀ ਮਿਤੀ",
    col_urgency: "ਜ਼ਰੂਰਤ ਦਾ ਪੱਧਰ",
    col_status: "ਸਥਿਤੀ",
    col_worker: "ਨਿਰਧਾਰਤ ਵਰਕਰ",
    col_notes: "ਅਰਜ਼ੀ ਨੋਟਸ",
    no_history_records: "ਕੋਈ ਅਰਜ਼ੀ ਦਰਜ ਨਹੀਂ ਹੈ।",

    // Messages / Advocate
    translation_banner_title: "ਸਵੈਚਲਿਤ ਭਾਸ਼ਾ ਖੋਜ ਅਤੇ ਅਸਲ-ਸਮੇਂ ਦਾ ਅਨੁਵਾਦ",
    translation_banner_sub: "ਆਪਣੀ ਮਾਤ ਭਾਸ਼ਾ ਵਿੱਚ ਲਿਖੋ। ਸੁਨੇਹੇ ਤੁਹਾਡੇ ਸਲਾਹਕਾਰ ਲਈ ਆਪਣੇ-ਆਪ ਅਨੁਵਾਦ ਕੀਤੇ ਜਾਂਦੇ ਹਨ।",
    translate_into: "ਵਿੱਚ ਅਨੁਵਾਦ ਕਰੋ:",
    auto_translate: "ਸਵੈ-ਅਨੁਵਾਦ",
    btn_request_interpreter: "+ ਲਾਈਵ ਦੁਭਾਸ਼ੀਏ ਦੀ ਮੰਗ ਕਰੋ",
    interpreter_requested: "ਦੁਭਾਸ਼ੀਏ ਦੀ ਮੰਗ ਕੀਤੀ ਗਈ ਹੈ",
    threads_title: "ਗੱਲਬਾਤ ਅਤੇ ਕੇਸ ਥਰਿੱਡ",
    active_thread_title: "ਕੇਸਵਰਕ ਸਹਾਇਤਾ ਅਤੇ ਸਿੱਧਾ ਸੁਨੇਹਾ",
    direct_caseworker: "ਸਿੱਧਾ ਕੇਸਵਰਕਰ:",
    gdpr_encrypted: "UK GDPR 256-ਬਿੱਟ ਐਨਕ੍ਰਿਪਟਡ",
    encrypted_banner: "ਇਸ ਥਰਿੱਡ ਵਿੱਚ ਸੁਨੇਹੇ ਯੂਕੇ ਚੈਰਿਟੀ ਕਾਨੂੰਨ ਤਹਿਤ ਸੁਰੱਖਿਅਤ ਹਨ।",
    no_messages_yet: "ਅਜੇ ਕੋਈ ਸੁਨੇਹਾ ਨਹੀਂ",
    no_messages_sub: "ਸਿੱਧੀ ਗੱਲਬਾਤ ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਹੇਠਾਂ ਸੁਨੇਹਾ ਲਿਖੋ ਜਾਂ ਵੌਇਸ ਨੋਟ ਭੇਜੋ।",
    chat_placeholder: "ਆਪਣੇ ਕੇਸਵਰਕਰ ਨੂੰ ਸੁਨੇਹਾ ਲਿਖੋ...",
    btn_send: "ਭੇਜੋ",
    btn_voice_note: "ਵੌਇਸ ਨੋਟ",
    recording_text: "ਵੌਇਸ ਰਿਕਾਰਡਿੰਗ ਚੱਲ ਰਹੀ ਹੈ...",
    btn_stop_record: "ਰੋਕੋ ਅਤੇ ਨੱਥੀ ਕਰੋ",
    btn_translate_msg: "ਸੁਨੇਹਾ ਅਨੁਵਾਦ ਕਰੋ",
    original_text: "ਅਸਲ ਲਿਖਤ:",
    original_audio_transcript: "ਅਸਲ ਆਡੀਓ ਲਿਖਤ:",

    // Notifications
    notifications_title: "ਸੂਚਨਾਵਾਂ ਅਤੇ ਅਲਰਟ",
    notifications_subtitle: "ਤੁਹਾਡੀਆਂ ਅਰਜ਼ੀਆਂ ਅਤੇ ਸੁਨੇਹਿਆਂ ਦੇ ਨਵੇਂ ਅਪਡੇਟ।",
    btn_mark_all_read: "ਸਾਰੇ ਪੜ੍ਹੇ ਵਜੋਂ ਚਿੰਨ੍ਹਿਤ ਕਰੋ",
    no_notifications: "ਕੋਈ ਨਵੀਂ ਸੂਚਨਾ ਨਹੀਂ",

    // Language Settings
    lang_settings_title: "ਭਾਸ਼ਾ ਸੈਟਿੰਗਾਂ ਅਤੇ ਦੁਭਾਸ਼ੀਆ ਤਰਜੀਹਾਂ",
    lang_settings_subtitle: "ਆਪਣੀ ਪਸੰਦੀਦਾ ਭਾਸ਼ਾ ਚੁਣੋ। ਜ਼ਿੰਥੀਆ ਟਰੱਸਟ ਸਾਰੀਆਂ ਮੀਟਿੰਗਾਂ ਲਈ ਅਨੁਵਾਦ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ।",
    btn_save_language: "ਭਾਸ਼ਾ ਦੀ ਚੋਣ ਸੰਭਾਲੋ",
    toast_lang_saved: "ਭਾਸ਼ਾ ਦੀਆਂ ਤਰਜੀਹਾਂ ਸਫਲਤਾਪੂਰਵਕ ਅੱਪਡੇਟ ਹੋ ਗਈਆਂ ਹਨ।",

    // Modals
    modal_request_title: "ਸਹਾਇਤਾ ਲਈ ਬੇਨਤੀ ਕਰੋ",
    modal_request_sub: "ਤੁਹਾਡੀ ਬੇਨਤੀ ਸਿੱਧੀ ਕੇਸਵਰਕਰ ਕੋਲ ਜਾਂਦੀ ਹੈ",
    form_category: "ਸਹਾਇਤਾ ਸ਼੍ਰੇਣੀ *",
    form_urgency: "ਜ਼ਰੂਰਤ ਦਾ ਪੱਧਰ *",
    form_notes: "ਵੇਰਵੇ / ਤੁਹਾਨੂੰ ਕੀ ਚਾਹੀਦਾ ਹੈ *",
    form_notes_placeholder: "ਤੁਹਾਨੂੰ ਤੁਰੰਤ ਕੀ ਚਾਹੀਦਾ ਹੈ, ਸੰਖੇਪ ਵਿੱਚ ਦੱਸੋ...",
    btn_cancel: "ਰੱਦ ਕਰੋ",
    btn_submit_request: "ਬੇਨਤੀ ਜਮ੍ਹਾਂ ਕਰੋ",
    submitting: "ਜਮ੍ਹਾਂ ਹੋ ਰਿਹਾ ਹੈ...",
    modal_logout_title: "ਲਾੱਗ ਆਉਟ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ",
    modal_logout_desc: "ਕੀ ਤੁਸੀਂ ਸੱਚਮੁੱਚ ਲਾੱਗ ਆਉਟ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?",
    kpi_distributed_sub: "ਕੁੱਲ ਪ੍ਰਵਾਨਿਤ ਅਤੇ ਵੰਡੀ ਗਈ ਕਮਿਊਨਿਟੀ ਰਾਹਤ ਸਹਾਇਤਾ।",
    kpi_allocated_sub: "ਮੌਜੂਦਾ ਸਰਗਰਮ ਗ੍ਰਾਂਟਾਂ ਅਤੇ ਪੂਰਤੀ ਅਧੀਨ ਸਹਾਇਤਾ।",
    advocate_details_title: "ਸੌਂਪੇ ਗਏ ਸਲਾਹਕਾਰ ਦੇ ਵੇਰਵੇ",
    active_advocate_badge: "ਸਰਗਰਮ ਸਲਾਹਕਾਰ",
    advocate_role_title: "ਸੀਨੀਅਰ ਪਰਿਵਾਰ ਭਲਾਈ ਅਤੇ ਸੰਕਟ ਸਲਾਹਕਾਰ",
    available_today: "• ਅੱਜ ਸਲਾਹ-ਮਸ਼ਵਰੇ ਲਈ ਉਪਲਬਧ",
    direct_helpline_label: "ਸਿੱਧੀ ਹੈਲਪਲਾਈਨ:",
    duty_email_label: "ਡਿਊਟੀ ਈਮੇਲ:",
    duty_hours_text: "ਡਿਊਟੀ ਦਾ ਸਮਾਂ: ਸੋਮ – ਸ਼ੁੱਕਰ, ਸਵੇਰੇ 9:00 – ਸ਼ਾਮ 4:30",
    btn_message_caseworker: "ਕੇਸਵਰਕਰ ਨੂੰ ਸੁਨੇਹਾ ਭੇਜੋ",
    btn_call_caseworker: "ਕੇਸਵਰਕਰ ਨੂੰ ਕਾਲ ਕਰੋ",
    tab_recent_messages: "ਹਾਲੀਆ ਸੁਨੇਹੇ",
    tab_notifications: "ਸੂਚਨਾਵਾਂ",
    view_all_arrow: "ਸਭ ਦੇਖੋ →",
    duty_office_badge: "ਡਿਊਟੀ ਦਫ਼ਤਰ",
    welcome_portal_message: "\"ਜ਼ਿੰਥੀਆ ਟਰੱਸਟ ਕਲਾਇੰਟ ਪੋਰਟਲ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ। ਤੁਸੀਂ ਆਪਣੀ ਕੇਸ ਫਾਈਲ ਦੀ ਸਮੀਖਿਆ ਕਰ ਸਕਦੇ ਹੋ, ਅਲਾਟ ਕੀਤੀ ਸਹਾਇਤਾ ਦੀ ਜਾਂਚ ਕਰ ਸਕਦੇ ਹੋ, ਜਾਂ ਐਮਰਜੈਂਸੀ ਸਹਾਇਤਾ ਲਈ ਬੇਨਤੀ ਕਰ ਸਕਦੇ ਹੋ।\"",
    btn_open_advocate_thread: "ਸਲਾਹਕਾਰ ਮੈਸੇਜਿੰਗ ਥ੍ਰੈੱਡ ਖੋਲ੍ਹੋ →",
    no_active_notifications: "ਕੋਈ ਸਰਗਰਮ ਸੂਚਨਾਵਾਂ ਦਰਜ ਨਹੀਂ ਹਨ।",
    filter_all_records: "ਸਾਰੇ ਰਿਕਾਰਡ",
    filter_received: "ਪ੍ਰਾਪਤ ਹੋਇਆ",
    filter_approved: "ਪ੍ਰਵਾਨਿਤ",
    filter_cancelled: "ਰੱਦ ਕੀਤਾ ਗਿਆ",
    filter_completed: "ਮੁਕੰਮਲ",
    tab_applied_requests: "ਦਰਜ ਕੀਤੀਆਂ ਬੇਨਤੀਆਂ",
    col_assistance_type: "ਸਹਾਇਤਾ ਦੀ ਕਿਸਮ",
    col_amount: "ਰਕਮ",
    col_action: "ਕਾਰਵਾਈ",
    is_typing: "ਟਾਈਪ ਕਰ ਰਿਹਾ ਹੈ...",
    approved_by_trustees: "ਟਰੱਸਟੀਆਂ ਦੁਆਰਾ ਪ੍ਰਵਾਨਿਤ",
    download_award_summary: "ਅਵਾਰਡ ਸੰਖੇਪ ਡਾਊਨਲੋਡ ਕਰੋ (PDF)",
    active_allocations_count: "ਸਰਗਰਮ ਅਲਾਟਮੈਂਟਾਂ",
    active_approved_grants: "ਸਰਗਰਮ ਪ੍ਰਵਾਨਿਤ ਗ੍ਰਾਂਟਾਂ",
    allocations_badge: "ਅਲਾਟਮੈਂਟਾਂ",
    trustee_verified_auth: "100% ਟਰੱਸਟੀ ਤਸਦੀਕਸ਼ੁਦਾ ਅਤੇ ਅਧਿਕਾਰਤ",
    filter_disbursed_active: "ਵੰਡਿਆ ਗਿਆ ਅਤੇ ਸਰਗਰਮ",
    btn_grant_cards: "ਗ੍ਰਾਂਟ ਕਾਰਡ",
    btn_table_view: "ਟੇਬਲ ਦ੍ਰਿਸ਼",
    search_assistance_placeholder: "ਮਕਸਦ, ਗ੍ਰਾਂਟ, ਰੈਫ਼ ਲੱਭੋ...",
    alloc_details_governance: "ਸਹਾਇਤਾ ਵੇਰਵੇ ਅਤੇ ਪ੍ਰਬੰਧਨ",
    lbl_funding_partner: "ਫੰਡਿੰਗ ਭਾਈਵਾਲ:",
    lbl_supervising_caseworker: "ਨਿਗਰਾਨੀ ਕੇਸਵਰਕਰ:",
    lbl_disbursement_method: "ਵੰਡ ਦਾ ਤਰੀਕਾ:",
    lbl_trustee_authority: "ਟਰੱਸਟੀ ਅਥਾਰਟੀ:",
    lbl_permitted_use: "ਮਨਜ਼ੂਰ ਵਰਤੋਂ:",
    milestone_tracker_title: "ਮੌਜੂਦਾ ਸਥਿਤੀ ਅਤੇ ਪੜਾਅ ਟਰੈਕਰ",
    valid_through: "ਤੱਕ ਵੈਧ:",
    current_relief_period: "ਮੌਜੂਦਾ ਰਾਹਤ ਮਿਆਦ",
    certified_care_charter: "ਜ਼ਿੰਥੀਆ ਟਰੱਸਟ ਕੇਅਰ ਚਾਰਟਰ ਤਹਿਤ ਪ੍ਰਮਾਣਿਤ",
    btn_award_letter_pdf: "ਅਵਾਰਡ ਪੱਤਰ (PDF)",
    btn_view_full_details: "ਪੂਰੇ ਵੇਰਵੇ ਦੇਖੋ →",
    view_details: "ਵੇਰਵੇ ਦੇਖੋ",
    tbl_col_allocated_amount: "ਅਲਾਟ ਕੀਤੀ ਰਕਮ",
    tbl_col_purpose_ref: "ਅਲਾਟਮੈਂਟ ਦਾ ਮਕਸਦ",
    tbl_col_alloc_date: "ਅਲਾਟਮੈਂਟ ਮਿਤੀ",
    tbl_col_current_status: "ਮੌਜੂਦਾ ਸਥਿਤੀ",
    tbl_col_details_action: "ਵੇਰਵੇ ਅਤੇ ਕਾਰਵਾਈ",
    btn_close: "ਬੰਦ ਕਰੋ",
    btn_print_notice: "ਅਲਾਟਮੈਂਟ ਨੋਟਿਸ ਪ੍ਰਿੰਟ ਕਰੋ",
    advocate_dossier_title: "ਸੌਂਪੇ ਗਏ ਸਲਾਹਕਾਰ ਦਸਤਾਵੇਜ਼",
    btn_book_appointment: "ਮੁਲਾਕਾਤ ਬੁੱਕ ਕਰੋ",
    lbl_preferred_name: "ਪਸੰਦੀਦਾ ਨਾਮ / ਸੰਬੋਧਨ *",
    lbl_preferred_lang: "ਪਸੰਦੀਦਾ ਬੋਲੀ ਅਤੇ ਲਿਖਤੀ ਭਾਸ਼ਾ",
    btn_save_personal_info: "ਨਿੱਜੀ ਜਾਣਕਾਰੀ ਸੰਭਾਲੋ",
    btn_save_contact_details: "ਸੰਪਰਕ ਵੇਰਵੇ ਸੰਭਾਲੋ",
    "badge_support_archive": "ਸਹਾਇਤਾ ਆਰਕਾਈਵ",
    "lbl_case_ref": "ਕੇਸ ਹਵਾਲਾ:",
    "kpi_support_received": "ਪ੍ਰਾਪਤ ਕੀਤੀ ਸਹਾਇਤਾ",
    "kpi_disbursed_received": "ਵੰਡੀਆਂ ਅਤੇ ਪ੍ਰਾਪਤ ਗ੍ਰਾਂਟਾਂ",
    "kpi_allocated_support": "ਅਲਾਟ ਕੀਤੀ ਸਹਾਇਤਾ",
    "kpi_pending_payout": "ਭੁਗਤਾਨ ਬਕਾਇਆ ਗ੍ਰਾਂਟਾਂ",
    "kpi_total_tracked": "ਕੁੱਲ ਟਰੈਕ ਕੀਤੀ ਸਹਾਇਤਾ",
    "kpi_records": "ਰਿਕਾਰਡ",
    "kpi_casework_ledger_active": "ਅਧਿਕਾਰਤ ਕੇਸਵਰਕ ਖਾਤਾ ਸਰਗਰਮ",
    "status_received": "ਮਿਲਿਆ",
    "status_approved": "ਮਨਜ਼ੂਰਸ਼ੁਦਾ",
    "th_assistance_type": "ਸਹਾਇਤਾ ਦੀ ਕਿਸਮ",
    "th_amount": "ਰਕਮ",
    "th_status": "ਸਥਿਤੀ",
    "th_date": "ਮਿਤੀ",
    "th_action": "ਕਾਰਵਾਈ",
    "btn_view_details": "ਵੇਰਵੇ ਦੇਖੋ",
    "lbl_submitted_by_client": "ਕਲਾਇੰਟ ਦੁਆਰਾ ਜਮ੍ਹਾਂ ਕੀਤਾ ਗਿਆ",
    "lbl_allocated_prefix": "ਅਲਾਟ ਕੀਤਾ: ",
    "footer_certified_ledger": "{name} ਲਈ ਪ੍ਰਮਾਣਿਤ ਅਧਿਕਾਰਤ ਸਹਾਇਤਾ ਖਾਤਾ • UK Charity No. 1137350.",
    "milestones_title": "ਕੇਸਵਰਕ ਮੀਲ ਪੱਥਰ ਅਤੇ ਸਮਾਂਰੇਖਾ",
    "milestones_sub": "ਸਲਾਹ-ਮਸ਼ਵਰੇ, ਗ੍ਰਾਂਟ ਵੰਡ ਅਤੇ ਮੁਕੰਮਲ ਮੁਲਾਂਕਣਾਂ ਦਾ ਕਦਮ-ਦਰ-ਕਦਮ ਇਤਿਹਾਸ।",
    "step_intake_assigned": "ਕੇਸ ਦਾਖਲਾ ਅਤੇ ਵਕੀਲ ਨਿਯੁਕਤੀ",
    "step_account_active": "ਲਾਭਪਾਤਰੀ ਖਾਤਾ ਸਰਗਰਮ ਅਤੇ ਪ੍ਰਮਾਣਿਤ ਹੈ",
    "step_intake_desc": "ਜ਼ਿੰਥੀਆ ਟਰੱਸਟ ਪੋਰਟਲ 'ਤੇ ਰਜਿਸਟਰਡ ਗਾਹਕ। ਸਮਰਪਿਤ ਕੇਸਵਰਕਰ ਨਿਯੁਕਤ ਕੀਤਾ ਗਿਆ।",
    "btn_download_ledger": "ਅਧਿਕਾਰਤ ਸਹਾਇਤਾ ਖਾਤਾ ਡਾਊਨਲੋਡ ਕਰੋ",
    "modal_assistance_details": "ਸਹਾਇਤਾ ਦੇ ਵੇਰਵੇ",
    "lbl_allocated_funds_title": "ਸਹਾਇਤਾ ਬੇਨਤੀਆਂ ਤੋਂ ਅਲਾਟ ਕੀਤੇ ਫੰਡ",
    "lbl_total_allocated_prefix": "ਕੁੱਲ ਅਲਾਟ: ",
    "lbl_admin_feedback": "ਐਡਮਿਨ ਸਮੀਖਿਆ ਨੋਟਸ ਅਤੇ ਫੀਡਬੈਕ:",
    "btn_download_statement": "ਸਟੇਟਮੈਂਟ ਡਾਊਨਲੋਡ ਕਰੋ",
    "lbl_credentials": "ਪੇਸ਼ੇਵਰ ਪ੍ਰਮਾਣ ਪੱਤਰ:",
    "lbl_badge_id": "ਵਕੀਲ ਬੈਜ ਆਈਡੀ:",
    "lbl_office_hours": "ਦਫ਼ਤਰ ਦੇ ਘੰਟੇ:",
    "lbl_office_loc": "ਦਫ਼ਤਰ ਦਾ ਭੌਤਿਕ ਸਥਾਨ:",
    "lbl_casework_languages": "ਕੇਸਵਰਕ ਭਾਸ਼ਾਵਾਂ:",
    "lbl_advocate_bio": "ਵਕੀਲ ਪਿਛੋਕੜ",
    "urgency_high": "ਉੱਚ ਤਰਜੀਹ (24-48 ਘੰਟਿਆਂ ਵਿੱਚ ਜ਼ਰੂਰੀ ਲੋੜਾਂ)",
    "urgency_critical": "ਗੰਭੀਰ ਐਮਰਜੈਂਸੀ (ਤੁਰੰਤ ਸੰਕਟ)",
    "urgency_medium": "ਮਿਆਰੀ ਸਹਾਇਤਾ (ਅਗਲੇ 3-5 ਕੰਮਕਾਜੀ ਦਿਨ)",
    "lbl_supporting_docs": "ਸਹਾਇਕ ਦਸਤਾਵੇਜ਼",
    "lbl_attach_docs_hint": "ਬਿੱਲ, ਪੱਤਰ, ਨੋਟਿਸ, ਪਛਾਣ ਪੱਤਰ ਨੱਥੀ ਕਰੋ",
    "btn_add_supporting_docs": "+ ਸਹਾਇਕ ਦਸਤਾਵੇਜ਼ ਸ਼ਾਮਲ ਕਰੋ (ਬਹੁਤੇ ਚੁਣ ਸਕਦੇ ਹੋ)",
    "profile_personal_sub": "ਅਧਿਕਾਰਤ ਰਿਕਾਰਡ ਦੇਖੋ ਅਤੇ ਮਨਜ਼ੂਰ ਪਛਾਣ ਵੇਰਵਿਆਂ ਨੂੰ ਅੱਪਡੇਟ ਕਰੋ।",
    "lbl_full_legal_name": "ਪੂਰਾ ਕਾਨੂੰਨੀ ਨਾਮ (ਅਧਿਕਾਰਤ ਰਿਕਾਰਡ)",
    "lbl_verified_record": "ਪ੍ਰਮਾਣਿਤ ਰਿਕਾਰਡ",
    "lbl_legal_name_hint": "ਆਪਣੇ ਅਧਿਕਾਰਤ ਕਾਨੂੰਨੀ ਨਾਮ ਨੂੰ ਅੱਪਡੇਟ ਕਰਨ ਲਈ ਕੇਸਵਰਕਰ ਪਛਾਣ ਤਸਦੀਕ ਦੀ ਲੋੜ ਹੈ।",
    "lbl_preferred_salutation": "ਤਰਜੀਹੀ ਨਾਮ / ਸੰਬੋਧਨ *",
    "lbl_preferred_name_hint": "ਤੁਸੀਂ ਕਿਵੇਂ ਚਾਹੁੰਦੇ ਹੋ ਕਿ ਕੇਸਵਰਕਰ ਅਤੇ ਸਹਾਇਤਾ ਕਰਮਚਾਰੀ ਤੁਹੂੰ ਸੰਬੋਧਿਤ ਕਰਨ।",
    "lbl_case_reference_num": "ਕਲਾਇੰਟ ਕੇਸ ਹਵਾਲਾ ਨੰਬਰ",
    "lbl_dob_verified": "ਜਨਮ ਮਿਤੀ (ਪ੍ਰਮਾਣਿਤ)",
    "lbl_pref_spoken_written": "ਤਰਜੀਹੀ ਬੋਲੀ ਅਤੇ ਲਿਖਤੀ ਭਾਸ਼ਾ",
    "lbl_interpreter_session": "ਵਿਅਕਤੀਗਤ ਸੈਸ਼ਨਾਂ ਲਈ ਮਾਨਤਾ ਪ੍ਰਾਪਤ ਦੁਭਾਸ਼ੀਆ",
    "opt_not_required": "ਲੋੜ ਨਹੀਂ",
    "opt_require_interpreter": "ਦੁਭਾਸ਼ੀਏ ਦੀ ਲੋੜ ਹੈ",
    "profile_contact_sub": "ਕੇਸਵਰਕ ਅੱਪਡੇਟਾਂ ਲਈ ਆਪਣੇ ਫ਼ੋਨ ਨੰਬਰ, ਈਮੇਲ ਅਤੇ ਐਮਰਜੈਂਸੀ ਸੰਪਰਕ ਪ੍ਰਬੰਧਿਤ ਕਰੋ।",
    "lbl_primary_phone": "ਮੁੱਖ ਮੋਬਾਈਲ ਫ਼ੋਨ ਨੰਬਰ *",
    "lbl_secondary_phone": "ਵਿਕਲਪਿਕ / ਘਰੇਲੂ ਲੈਂਡਲਾਈਨ (ਵਿਕਲਪਿਕ)",
    "lbl_preferred_contact_method": "ਤਰਜੀਹੀ ਸੰਪਰਕ ਵਿਧੀ",
    "lbl_best_time_to_call": "ਕਾਲ ਕਰਨ ਦਾ ਸਭ ਤੋਂ ਵਧੀਆ ਸਮਾਂ",
    "lbl_emergency_name": "ਐਮਰਜੈਂਸੀ ਨਜ਼ਦੀਕੀ ਰਿਸ਼ਤੇਦਾਰ ਦਾ ਨਾਮ",
    "lbl_emergency_phone": "ਐਮਰਜੈਂਸੀ ਸੰਪਰਕ ਨੰਬਰ",
    "lbl_emergency_rel": "ਐਮਰਜੈਂਸੀ ਸੰਪਰਕ ਨਾਲ ਸੰਬੰਧ",
    "profile_housing_sub": "ਉਪਯੋਗਤਾ ਵਾਊਚਰ, ਡਿਲੀਵਰੀ ਅਤੇ ਕੌਂਸਲ ਲਾਭਾਂ ਲਈ ਆਪਣਾ ਪਤਾ ਸਹੀ ਰੱਖੋ।",
    "lbl_proof_verified": "ਸਬੂਤ ਪ੍ਰਮਾਣਿਤ",
    "lbl_address_line1": "ਪਤਾ ਲਾਈਨ 1 (ਗਲੀ ਅਤੇ ਮਕਾਨ ਨੰਬਰ) *",
    "lbl_address_line2": "ਪਤਾ ਲਾਈਨ 2 (ਫਲੈਟ / ਅਪਾਰਟਮੈਂਟ - ਵਿਕਲਪਿਕ)",
    "lbl_city": "ਕਸਬਾ / ਸ਼ਹਿਰ *",
    "lbl_postcode": "ਪੋਸਟਕੋਡ *",
    "lbl_housing_tenure": "ਹਾਊਸਿੰਗ ਮਲਕੀਅਤ ਅਤੇ ਰਹਿਣ ਦੀ ਸਥਿਤੀ",
    "btn_save_address": "ਪਤੇ ਦੀ ਜਾਣਕਾਰੀ ਸੰਭਾਲੋ",
    "profile_security_title": "ਸੁਰੱਖਿਆ ਅਤੇ ਪਾਸਵਰਡ ਪ੍ਰਬੰਧਨ",
    "profile_security_sub": "ਯਕੀਨੀ ਬਣਾਓ ਕਿ ਤੁਹਾਡਾ ਖਾਤਾ ਇੱਕ ਮਜ਼ਬੂਤ, ਗੁਪਤ ਪਾਸਵਰਡ ਨਾਲ ਸੁਰੱਖਿਅਤ ਹੈ।",
    "lbl_current_pw": "ਮੌਜੂਦਾ ਪਾਸਵਰਡ *",
    "lbl_new_pw": "ਨਵਾਂ ਪਾਸਵਰਡ *",
    "lbl_confirm_new_pw": "ਨਵੇਂ ਪਾਸਵਰਡ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ *",
    "gdpr_notice_title": "UK GDPR ਡਾਟਾ ਸੁਰੱਖਿਆ ਅਤੇ ਪ੍ਰਵਾਨਿਤ ਬਦਲਾਅ",
    "gdpr_notice_desc": "ਤੁਸੀਂ ਆਪਣਾ ਤਰਜੀਹੀ ਨਾਮ, ਫ਼ੋਨ ਨੰਬਰ, ਪਤਾ ਅਤੇ ਪਾਸਵਰਡ ਕਿਸੇ ਵੀ ਸਮੇਂ ਅੱਪਡੇਟ ਕਰ ਸਕਦੇ ਹੋ। ਕਾਨੂੰਨੀ ਨਾਮ ਜਾਂ ਜਨਮ ਮਿਤੀ ਲਈ ਤਸਦੀਕ ਜ਼ਰੂਰੀ ਹੈ।",
    "online_duty_caseworker": "ਔਨਲਾਈਨ • ਡਿਊਟੀ ਕੇਸਵਰਕਰ",
    "typically_replies": "ਡਿਊਟੀ ਦੇ ਘੰਟਿਆਂ ਦੌਰਾਨ ਆਮ ਤੌਰ 'ਤੇ 2 ਘੰਟਿਆਂ ਵਿੱਚ ਜਵਾਬ ਦਿੰਦਾ ਹੈ",
    "btn_call_advocate": "ਵਕੀਲ ਨੂੰ ਕਾਲ ਕਰੋ",
    "btn_view_advocate_profile": "ਪੂਰੀ ਵਕੀਲ ਪ੍ਰੋਫਾਈਲ ਦੇਖੋ",
    "advocate_spoken_langs": "ਵਕੀਲ ਦੀਆਂ ਬੋਲੀਆਂ ਜਾਣ ਵਾਲੀਆਂ ਭਾਸ਼ਾਵਾਂ:",
    "btn_stop_send_voice": "ਰੋਕੋ ਅਤੇ ਵੌਇਸ ਨੋਟ ਭੇਜੋ",
    "lbl_playing_audio": "ਆਡੀਓ ਚੱਲ ਰਿਹਾ ਹੈ...",
    "lbl_voice_message": "ਵੌਇਸ ਸੁਨੇਹਾ",
    "lbl_show_orig_transcript": "ਅਸਲ ਆਡੀਓ ਪ੍ਰਤੀਲਿਪੀ ਦਿਖਾਓ",
    "lbl_translate_transcript": "ਆਡੀਓ ਪ੍ਰਤੀਲਿਪੀ ਦਾ ਅਨੁਵਾਦ ਕਰੋ",
    "lbl_translating": "ਅਨੁਵਾਦ ਹੋ ਰਿਹਾ ਹੈ...",
    "lbl_recording_voice": "ਵੌਇਸ ਨੋਟ ਰਿਕਾਰਡ ਹੋ ਰਿਹਾ ਹੈ...",
    "urgent_emergency_title": "ਜ਼ਰੂਰੀ ਐਮਰਜੈਂਸੀ ਕੇਸਵਰਕ?",
    "urgent_emergency_desc": "ਜੇਕਰ ਤੁਹਾਡੀ ਊਰਜਾ ਸਪਲਾਈ ਕੱਟ ਦਿੱਤੀ ਗਈ ਹੈ ਜਾਂ ਐਮਰਜੈਂਸੀ ਆਸਰੇ ਦੀ ਲੋੜ ਹੈ, ਤਾਂ 0116 254 5168 'ਤੇ ਕਾਲ ਕਰੋ।",
    "msg_pw_changed_success": "ਤੁਹਾਡਾ ਪਾਸਵਰਡ ਸਫਲਤਾਪੂਰਵਕ ਬਦਲਿਆ ਗਿਆ ਹੈ।",
    "btn_save": "ਸੰਭਾਲੋ",
    "lbl_show_original": "ਅਸਲ ਸੁਨੇਹਾ ਦਿਖਾਓ",
    "lbl_show_orig_en": "ਅਸਲ ਦਿਖਾਓ (ਅੰਗਰੇਜ਼ੀ)",
    "btn_translate_into": "ਵਿੱਚ ਅਨੁਵਾਦ ਕਰੋ",
    "lbl_note_relocating": "ਸਥਾਨ ਬਦਲਣ ਲਈ ਨੋਟ:",
    "desc_note_relocating": "ਜੇਕਰ ਤੁਸੀਂ ਕਿਸੇ ਨਵੇਂ ਘਰ ਵਿੱਚ ਜਾਂਦੇ ਹੋ, ਤਾਂ ਪਤਾ ਅੱਪਡੇਟ ਕਰਨ ਨਾਲ ਸਹਾਇਤਾ ਤੁਹਾਡੇ ਮੌਜੂਦਾ ਘਰ ਪਹੁੰਚੇਗੀ।",
    "lbl_app_stage": "ਅਰਜ਼ੀ ਦਾ ਪੜਾਅ",
    "lbl_award_amount": "ਅਵਾਰਡ ਰਕਮ",
    "lbl_reference_id": "ਹਵਾਲਾ ਆਈਡੀ",
    "lbl_submitted_for_approval": "ਐਡਮਿਨ ਮਨਜ਼ੂਰੀ ਲਈ ਜਮ੍ਹਾਂ ਕੀਤਾ ਗਿਆ:",
    "lbl_assistance_notes": "ਸਹਾਇਤਾ ਦਾ ਦਾਇਰਾ ਅਤੇ ਨੋਟਸ:",
    "lbl_supporting_docs_approval": "ਮਨਜ਼ੂਰੀ ਲਈ ਦਿੱਤੇ ਸਹਾਇਕ ਦਸਤਾਵੇਜ਼",
    "btn_view_file": "ਫਾਈਲ ਦੇਖੋ",
    "lbl_linked_allocations": "ਲਿੰਕ ਕੀਤੇ ਸਹਾਇਤਾ ਅਲਾਟਮੈਂਟ",
    "lbl_total_colon": "ਕੁੱਲ:",
    "lbl_intake_case_ref": "ਕੇਸ ਹਵਾਲੇ ਅਧੀਨ ਰਜਿਸਟਰਡ ਦਾਖਲਾ:",
    "badge_recorded": "ਦਰਜ ਕੀਤਾ",
  },

  ur: {
    lbl_effective_date: "مؤثر:",
    lbl_email_address: "رجسٹرڈ ای میل پتہ *",
    modal_allocation_cert_notice: "اس امدادی پیکیج کا باضابطہ جائزہ اور اجازت دی زنتھیا ٹرسٹ کی جانب سے دی گئی ہے",
    effective_date_label: "مؤثر / ادائیگی کی تاریخ",
    funding_auth_label: "فنڈنگ پارٹنر اور توثیق",
    permitted_terms_label: "مجاز استعمال اور شرائط",
    conversations_sub: "فعال کیس ورک بات چیت اور سابقہ حل شدہ امدادی ریکارڈ کے درمیان سوئچ کریں۔",
    advocate_info_btn: "معاون کی معلومات اور براہ راست لائن ←",
    no_notifications_sub: "کوئی فعال الرٹ نہیں ہے۔ آپ کی ہنگامی گرانٹس، درخواستوں اور کیس ورکر کے پیغامات کے تصدیق شدہ اپ ڈیٹس یہاں ریئل ٹائم میں ظاہر ہوں گے۔",

    // Nav
    portal_badge: "مستفید پورٹل",
    nav_dashboard: "ڈیش بورڈ",
    nav_profile: "میری پروفائل",
    nav_assistance: "مختص امداد",
    nav_history: "امداد کی تاریخ",
    nav_messages: "پیغامات / وکیل",
    nav_notifications: "اطلاعات",
    nav_language: "زبان کی ترتیبات",
    nav_logout: "لاگ آؤٹ",
    helpline_title: "کیس ورک ہیلپ لائن",
    helpline_hours: "پیر - جمعہ، صبح 9:00 - شام 4:30",

    // Header
    client_care_portal: "کلائنٹ کیئر پورٹل",
    caseworker_prefix: "کیس ورکر:",
    crisis_advocate_badge: "مخصوص کرائسس ایڈووکیٹ",
    btn_request_support: "+ امداد کی درخواست کریں",
    btn_logout: "لاگ آؤٹ",

    // Dashboard
    welcome_back: "خوش آمدید",
    active_beneficiary: "فعال مستفید",
    case_ref: "کیس ریفرنس:",
    gdpr_verified: "UK GDPR تصدیق شدہ اکاؤنٹ",
    display_currency: "کرنسی دکھائیں:",
    registered_contact: "رجسٹرڈ رابطہ",
    registered_home_address: "رجسٹرڈ گھر کا پتہ",
    dedicated_worker: "مخصوص کرائسس ورکر",
    case_support_status: "کیس سپورٹ کی حیثیت",
    active_support: "فعال امداد",
    stat_total_allocated: "کل مختص امداد",
    stat_distributed: "اب تک تقسیم شدہ",
    stat_pending_payout: "زیر التواء ادائیگی",
    stat_pending_requests: "زیر التواء درخواستیں",
    stat_caseworker: "مخصوص کیس ورکر",
    stat_unread_messages: "ان پڑھ پیغامات",
    quick_actions: "فوری اقدامات",
    qa_send_message: "کیس ورکر کو پیغام بھیجیں",
    qa_view_grants: "گرانٹس اور الاٹمنٹ دیکھیں",
    qa_emergency_line: "ہنگامی ہیلپ لائن",
    recent_activity: "حالیہ کیس سرگرمی اور الرٹس",
    no_recent_activity: "کوئی حالیہ سرگرمی درج نہیں ہے۔",
    active_allocations_title: "فعال الاٹمنٹ",
    no_active_allocations: "کوئی فعال الاٹمنٹ نہیں ملی۔",
    view_all: "سب دیکھیں",

    // Profile
    profile_title: "کلائنٹ پروفائل اور کیئر فائل",
    profile_subtitle: "آپ کی تصدیق شدہ تفصیلات، تفویض کردہ وکیل اور ہنگامی رابطے۔",
    personal_details: "ذاتی تفصیلات",
    full_name: "پورا نام",
    client_ref: "کلائنٹ ریفرنس نمبر",
    dob: "تاریخ پیدائش",
    gender: "جنس",
    primary_language: "بنیادی زبان",
    contact_details: "رابطے کی تفصیلات",
    email_address: "ای میل پتہ",
    phone_number: "فون نمبر",
    residential_address: "رہائشی پتہ",
    council_area: "کونسل کا علاقہ",
    emergency_contact: "ہنگامی رابطہ",
    next_of_kin: "قریبی رشتہ دار / نام",
    emergency_phone: "ہنگامی فون نمبر",
    casework_assignment: "کیس ورک تفویض",
    assigned_advocate: "تفویض کردہ وکیل",
    secondary_worker: "ڈیوٹی ویلفیئر وکیل",
    case_status: "کیس کی حیثیت",
    support_type: "امداد کی قسم",
    household_size: "گھر کے افراد",
    change_password: "پاس ورڈ تبدیل کریں",
    current_password: "موجودہ پاس ورڈ",
    new_password: "نیا پاس ورڈ",
    confirm_new_password: "نئے پاس ورڈ کی تصدیق کریں",
    btn_update_password: "پاس ورڈ اپ ڈیٹ کریں",

    // Allocated Assistance
    assistance_title: "مختص امداد اور گرانٹ ریکارڈ",
    assistance_subtitle: "زنتھیا ٹرسٹ کی طرف سے منظور شدہ مالی اور ہنگامی امداد۔",
    filter_all: "تمام منظور شدہ",
    filter_pending: "زیر التواء ادائیگی",
    filter_distributed: "تقسیم شدہ",
    alloc_amount: "مختص امدادی رقم",
    alloc_date: "الاٹمنٹ کی تاریخ",
    alloc_purpose: "الاٹمنٹ کا مقصد",
    alloc_method: "ادائیگی کا طریقہ",
    alloc_award_letter: "ایوارڈ لیٹر (PDF)",
    download_pdf: "سرکاری الاٹمنٹ نوٹس ڈاؤن لوڈ ہو رہا ہے...",
    no_allocations_found: "کوئی الاٹمنٹ نہیں ملی۔",

    // Support History
    history_title: "امداد کی تاریخ اور لاگ",
    history_subtitle: "اپنی ماضی اور فعال درخواستوں کی حیثیت کو ٹریک کریں۔",
    col_category: "سروس / ضرورت کا زمرہ",
    col_date: "درخواست کی تاریخ",
    col_urgency: "فوری ضرورت کی سطح",
    col_status: "حیثیت",
    col_worker: "تفویض کردہ کارکن",
    col_notes: "درخواست کے نوٹس",
    no_history_records: "کوئی درخواست درج نہیں ہے۔",

    // Messages / Advocate
    translation_banner_title: "خودکار زبان کی شناخت اور حقیقی وقت کا ترجمہ",
    translation_banner_sub: "اپنی مادری زبان میں لکھیں۔ پیغامات کا خود بخود ترجمہ ہو جاتا ہے۔",
    translate_into: "ترجمہ کریں بمطابق:",
    auto_translate: "خودکار ترجمہ",
    btn_request_interpreter: "+ لائیو مترجم کی درخواست کریں",
    interpreter_requested: "مترجم کی درخواست کر دی گئی ہے",
    threads_title: "گفتگو اور کیس تھریڈز",
    active_thread_title: "کیس ورک وکالت اور براہ راست پیغام رسانی",
    direct_caseworker: "براہ راست کیس ورکر:",
    gdpr_encrypted: "UK GDPR 256-بٹ خفیہ کردہ",
    encrypted_banner: "اس تھریڈ کے پیغامات یوکے چیریٹی قانون کے تحت خفیہ ہیں۔",
    no_messages_yet: "ابھی تک کوئی پیغام نہیں",
    no_messages_sub: "گفتگو شروع کرنے کے لیے نیچے پیغام یا وائس نوٹ بھیجیں۔",
    chat_placeholder: "اپنے کیس ورکر کو پیغام لکھیں (یا اپنی زبان میں لکھیں)...",
    btn_send: "بھیجیں",
    btn_voice_note: "وائس نوٹ",
    recording_text: "وائس ریکارڈنگ جاری ہے...",
    btn_stop_record: "روکیں اور منسلک کریں",
    btn_translate_msg: "پیغام کا ترجمہ کریں",
    original_text: "اصل متن:",
    original_audio_transcript: "اصل آڈیو ٹرانسکرپٹ:",

    // Notifications
    notifications_title: "اطلاعات اور کیس الرٹس",
    notifications_subtitle: "آپ کی درخواستوں اور پیغامات پر حالیہ اپ ڈیٹس۔",
    btn_mark_all_read: "سب کو پڑھا ہوا نشان زد کریں",
    no_notifications: "کوئی نئی اطلاع نہیں ہے",

    // Language Settings
    lang_settings_title: "زبان کی ترتیبات اور مترجم کی ترجیحات",
    lang_settings_subtitle: "اپنی پسندیدہ زبان منتخب کریں۔ زنتھیا ٹرسٹ تمام رابطوں اور ملاقاتوں کے لیے تصدیق شدہ ترجمہ فراہم کرتا ہے۔",
    btn_save_language: "زبان کا انتخاب محفوظ کریں",
    toast_lang_saved: "زبان کی ترجیحات کامیابی کے ساتھ اپ ڈیٹ ہو گئیں۔ تمام پورٹل اب آپ کی منتخب کردہ زبان میں ہے۔",

    // Modals
    modal_request_title: "امداد یا ہنگامی مدد کی درخواست کریں",
    modal_request_sub: "آپ کی درخواست براہ راست تفویض کردہ کیس ورکر کو جاتی ہے",
    form_category: "امداد کا زمرہ *",
    form_urgency: "فوری ضرورت کی سطح *",
    form_notes: "مختصر تفصیل / آپ کو کیا ضرورت ہے *",
    form_notes_placeholder: "آپ کو فوری طور پر کیا درکار ہے اس کی مختصر تفصیل دیں...",
    btn_cancel: "منسوخ کریں",
    btn_submit_request: "درخواست جمع کروائیں",
    submitting: "جمع کروایا جا رہا ہے...",
    modal_logout_title: "لاگ آؤٹ کی تصدیق کریں",
    modal_logout_desc: "کیا آپ واقعی پورٹل سے لاگ آؤٹ کرنا چاہتے ہیں؟",
    kpi_distributed_sub: "کل منظور شدہ اور تقسیم شدہ کمیونٹی ریلیف امداد۔",
    kpi_allocated_sub: "موجودہ فعال گرانٹس اور تکمیل کے عمل سے گزرنے والی امداد۔",
    advocate_details_title: "تفویض کردہ وکیل کی تفصیلات",
    active_advocate_badge: "فعال وکیل",
    advocate_role_title: "سینئر خاندانی فلاح و بحران کے وکیل",
    available_today: "• آج مشاورت کے لیے دستیاب",
    direct_helpline_label: "براہ راست ہیلپ لائن:",
    duty_email_label: "ڈیوٹی ای میل:",
    duty_hours_text: "ڈیوٹی کے اوقات: پیر – جمعہ، صبح 9:00 – شام 4:30",
    btn_message_caseworker: "کیس ورکر کو پیغام بھیجیں",
    btn_call_caseworker: "کیس ورکر کو کال کریں",
    tab_recent_messages: "حالیہ پیغامات",
    tab_notifications: "اطلاعات",
    view_all_arrow: "سب دیکھیں ←",
    duty_office_badge: "ڈیوٹی دفتر",
    welcome_portal_message: "\"زنتھیا ٹرسٹ کلائنٹ پورٹل میں خوش آمدید۔ آپ اپنی کیس فائل کا جائزہ لے سکتے ہیں، مختص شدہ امداد چیک کر سکتے ہیں، یا ہنگامی امداد کی درخواست کر سکتے ہیں۔\"",
    btn_open_advocate_thread: "وکیل میسجنگ تھریڈ کھولیں ←",
    no_active_notifications: "کوئی فعال اطلاعات درج نہیں ہیں۔",
    filter_all_records: "تمام ریکارڈز",
    filter_received: "وصول شدہ",
    filter_approved: "منظور شدہ",
    filter_cancelled: "منسوخ شدہ",
    filter_completed: "مکمل شدہ",
    tab_applied_requests: "درخواست کردہ امداد",
    col_assistance_type: "امداد کی قسم",
    col_amount: "رقم",
    col_action: "کارروائی",
    is_typing: "ٹائپ کر رہے ہیں...",
    approved_by_trustees: "ٹرسٹیز کی طرف سے منظور شدہ",
    download_award_summary: "ایوارڈ کا خلاصہ ڈاؤن لوڈ کریں (PDF)",
    active_allocations_count: "فعال الاٹمنٹس",
    active_approved_grants: "فعال منظور شدہ گرانٹس",
    allocations_badge: "الاٹمنٹس",
    trustee_verified_auth: "100% ٹرسٹیز سے تصدیق شدہ اور مجاز",
    filter_disbursed_active: "تقسیم شدہ اور فعال",
    btn_grant_cards: "گرانٹ کارڈز",
    btn_table_view: "ٹیبل کا منظر",
    search_assistance_placeholder: "مقصد، گرانٹ، حوالہ تلاش کریں...",
    alloc_details_governance: "امداد کی تفصیلات اور انتظام",
    lbl_funding_partner: "فنڈنگ پارٹنر:",
    lbl_supervising_caseworker: "نگران کیس ورکر:",
    lbl_disbursement_method: "ادائیگی کا طریقہ:",
    lbl_trustee_authority: "ٹرسٹی اتھارٹی:",
    lbl_permitted_use: "مجاز استعمال:",
    milestone_tracker_title: "موجودہ حیثیت اور سنگ میل ٹریکر",
    valid_through: "تک درست:",
    current_relief_period: "موجودہ امدادی مدت",
    certified_care_charter: "زنتھیا ٹرسٹ کیئر چارٹر کے تحت تصدیق شدہ",
    btn_award_letter_pdf: "ایوارڈ لیٹر (PDF)",
    btn_view_full_details: "مکمل تفصیلات دیکھیں ←",
    view_details: "تفصیلات دیکھیں",
    tbl_col_allocated_amount: "مختص رقم",
    tbl_col_purpose_ref: "الاٹمنٹ کا مقصد",
    tbl_col_alloc_date: "الاٹمنٹ کی تاریخ",
    tbl_col_current_status: "موجودہ حیثیت",
    tbl_col_details_action: "تفصیلات اور کارروائی",
    btn_close: "بند کریں",
    btn_print_notice: "الاٹمنٹ نوٹس پرنٹ کریں",
    advocate_dossier_title: "تفویض کردہ وکیل کی فائل",
    btn_book_appointment: "ملاقات کا وقت بک کریں",
    lbl_preferred_name: "پسندیدہ نام / خطاب *",
    lbl_preferred_lang: "پسندیدہ بولی اور تحریری زبان",
    btn_save_personal_info: "ذاتی معلومات محفوظ کریں",
    btn_save_contact_details: "رابطے کی تفصیلات محفوظ کریں",
    "badge_support_archive": "امداد کا آرکائیو",
    "lbl_case_ref": "کیس کا حوالہ:",
    "kpi_support_received": "موصول شدہ امداد",
    "kpi_disbursed_received": "جاری شدہ اور موصول شدہ گرانٹس",
    "kpi_allocated_support": "مختص شدہ امداد",
    "kpi_pending_payout": "ادائیگی کے منتظر گرانٹس",
    "kpi_total_tracked": "کل ٹریک شدہ امداد",
    "kpi_records": "ریکارڈز",
    "kpi_casework_ledger_active": "سرکاری کیس ورک لیجر فعال",
    "status_received": "موصول ہوا",
    "status_approved": "منظور شدہ",
    "th_assistance_type": "امداد کی قسم",
    "th_amount": "رقم",
    "th_status": "حیثیت",
    "th_date": "تاریخ",
    "th_action": "کارروائی",
    "btn_view_details": "تفصیلات دیکھیں",
    "lbl_submitted_by_client": "کلائنٹ کی طرف سے جمع کرایا گیا",
    "lbl_allocated_prefix": "مختص کردہ: ",
    "footer_certified_ledger": "{name} کے لیے مصدقہ سرکاری امدادی لیجر • UK Charity No. 1137350۔",
    "milestones_title": "کیس ورک کے سنگ میل اور ٹائم لائن",
    "milestones_sub": "مشاورت، گرانٹ کی تقسیم اور مکمل شدہ جائزوں کی مرحلہ وار تاریخ۔",
    "step_intake_assigned": "کیس کا اندراج اور وکیل کی تعیناتی",
    "step_account_active": "مستفید کنندہ کا اکاؤنٹ فعال اور تصدیق شدہ ہے",
    "step_intake_desc": "زینتھیا ٹرسٹ پورٹل پر رجسٹرڈ کلائنٹ۔ سرشار کیس ورکر تفویض کردہ۔",
    "btn_download_ledger": "سرکاری امدادی لیجر ڈاؤن لوڈ کریں",
    "modal_assistance_details": "امداد کی تفصیلات",
    "lbl_allocated_funds_title": "سپورٹ کی درخواستوں سے مختص فنڈز",
    "lbl_total_allocated_prefix": "کل مختص: ",
    "lbl_admin_feedback": "ایڈمن کے جائزہ نوٹس اور تاثرات:",
    "btn_download_statement": "اسٹیٹمنٹ ڈاؤن لوڈ کریں",
    "lbl_credentials": "پیشہ ورانہ اسناد:",
    "lbl_badge_id": "ایڈوکیٹ بیج آئی ڈی:",
    "lbl_office_hours": "دفتر کے اوقات:",
    "lbl_office_loc": "دفتر کا مقام:",
    "lbl_casework_languages": "کیس ورک کی زبانیں:",
    "lbl_advocate_bio": "ایڈوکیٹ کا پس منظر",
    "urgency_high": "اعلی ترجیح (24-48 گھنٹوں میں فوری ضروریات)",
    "urgency_critical": "انتہائی ہنگامی صورتحال (فوری بحران)",
    "urgency_medium": "معیاری امداد (اگلے 3-5 کام کے دن)",
    "lbl_supporting_docs": "معاون دستاویزات",
    "lbl_attach_docs_hint": "بلز، خطوط، نوٹسز، شناختی کارڈز منسلک کریں",
    "btn_add_supporting_docs": "+ معاون دستاویزات شامل کریں (متعدد کی اجازت ہے)",
    "profile_personal_sub": "سرکاری ریکارڈز دیکھیں اور شناخت کی تفصیلات اپ ڈیٹ کریں۔",
    "lbl_full_legal_name": "مکمل قانونی نام (سرکاری ریکارڈ)",
    "lbl_verified_record": "تصدیق شدہ ریکارڈ",
    "lbl_legal_name_hint": "اپنا سرکاری قانونی نام اپ ڈیٹ کرنے کے لیے، کیس ورکر سے تصدیق ضروری ہے۔",
    "lbl_preferred_salutation": "پسندیدہ نام / خطاب *",
    "lbl_preferred_name_hint": "کیس ورکرز اور عملہ آپ سے کس طرح مخاطب ہوں۔",
    "lbl_case_reference_num": "کلائنٹ کیس ریفرنس نمبر",
    "lbl_dob_verified": "تاریخ پیدائش (تصدیق شدہ)",
    "lbl_pref_spoken_written": "پسندیدہ بولی اور تحریری زبان",
    "lbl_interpreter_session": "روبرو سیشنز کے لیے تسلیم شدہ مترجم",
    "opt_not_required": "ضرورت نہیں",
    "opt_require_interpreter": "مترجم کی ضرورت ہے",
    "profile_contact_sub": "کیس ورک اپ ڈیٹس کے لیے اپنے فون نمبرز، ای میل اور ہنگامی رابطے کا انتظام کریں۔",
    "lbl_primary_phone": "بنیادی موبائل فون نمبر *",
    "lbl_secondary_phone": "متبادل / گھر کا لینڈ لائن (اختیاری)",
    "lbl_preferred_contact_method": "رابطے کا پسندیدہ طریقہ",
    "lbl_best_time_to_call": "کال کرنے کا بہترین وقت",
    "lbl_emergency_name": "ہنگامی قریبی رشتہ دار کا نام",
    "lbl_emergency_phone": "ہنگامی رابطہ نمبر",
    "lbl_emergency_rel": "ہنگامی رابطے کا رشتہ",
    "profile_housing_sub": "یوٹیلیٹی واؤچرز، ڈیلیوری اور کونسل فوائد کے لیے اپنے پتے کی تصدیق کریں۔",
    "lbl_proof_verified": "ثبوت تصدیق شدہ",
    "lbl_address_line1": "پتہ لائن 1 (گلی اور مکان نمبر) *",
    "lbl_address_line2": "پتہ لائن 2 (فلیٹ / اپارٹمنٹ - اختیاری)",
    "lbl_city": "قصبہ / شہر *",
    "lbl_postcode": "پوسٹ کوڈ *",
    "lbl_housing_tenure": "رہائشی ملکیت اور رہنے کی صورتحال",
    "btn_save_address": "پتے کی معلومات محفوظ کریں",
    "profile_security_title": "سیکیورٹی اور پاس ورڈ کا انتظام",
    "profile_security_sub": "یقینی بنائیں کہ آپ کا اکاؤنٹ ایک مضبوط، خفیہ پاس ورڈ سے محفوظ ہے۔",
    "lbl_current_pw": "موجودہ پاس ورڈ *",
    "lbl_new_pw": "نیا پاس ورڈ *",
    "lbl_confirm_new_pw": "نئے پاس ورڈ کی تصدیق کریں *",
    "gdpr_notice_title": "UK GDPR ڈیٹا کا تحفظ اور مجاز تبدیلیاں",
    "gdpr_notice_desc": "آپ اپنا نام، فون نمبر، پتہ اور پاس ورڈ کسی بھی وقت خود اپ ڈیٹ کر سکتے ہیں۔ قانونی نام یا تاریخ پیدائش کے لیے تصدیق درکار ہے۔",
    "online_duty_caseworker": "آن لائن • ڈیوٹی کیس ورکر",
    "typically_replies": "ڈیوٹی کے اوقات میں عام طور پر 2 گھنٹے میں جواب دیتا ہے",
    "btn_call_advocate": "ایڈوکیٹ کو کال کریں",
    "btn_view_advocate_profile": "مکمل ایڈوکیٹ پروفائل دیکھیں",
    "advocate_spoken_langs": "ایڈوکیٹ کی بولنے والی زبانیں:",
    "btn_stop_send_voice": "روکیں اور وائس نوٹ بھیجیں",
    "lbl_playing_audio": "آڈیو چل رہا ہے...",
    "lbl_voice_message": "وائس میسج",
    "lbl_show_orig_transcript": "اصل آڈیو ٹرانسکرپٹ دکھائیں",
    "lbl_translate_transcript": "آڈیو ٹرانسکرپٹ کا ترجمہ کریں",
    "lbl_translating": "ترجمہ ہو رہا ہے...",
    "lbl_recording_voice": "وائس نوٹ ریکارڈ ہو رہا ہے...",
    "urgent_emergency_title": "فوری ہنگامی کیس ورک؟",
    "urgent_emergency_desc": "اگر بجلی یا گیس منقطع ہو گئی ہے یا ہنگامی پناہ گاہ کی ضرورت ہے تو 0116 254 5168 پر کال کریں۔",
    "msg_pw_changed_success": "آپ کا پاس ورڈ کامیابی سے تبدیل ہو گیا ہے۔",
    "btn_save": "محفوظ کریں",
    "lbl_show_original": "اصل پیغام دکھائیں",
    "lbl_show_orig_en": "اصل دکھائیں (انگریزی)",
    "btn_translate_into": "میں ترجمہ کریں",
    "lbl_note_relocating": "نقل مکانی کے لیے نوٹ:",
    "desc_note_relocating": "اگر آپ نئے مکان میں منتقل ہوتے ہیں تو پتہ اپ ڈیٹ کرنا یقینی بناتا ہے کہ امداد آپ کے موجودہ پتے پر پہنچے۔",
    "lbl_app_stage": "درخواست کا مرحلہ",
    "lbl_award_amount": "گرانٹ کی رقم",
    "lbl_reference_id": "ریفرنس آئی ڈی",
    "lbl_submitted_for_approval": "ایڈمن کی منظوری کے لیے جمع کرایا گیا:",
    "lbl_assistance_notes": "امداد کا دائرہ کار اور نوٹس:",
    "lbl_supporting_docs_approval": "منظوری کے لیے فراہم کردہ معاون دستاویزات",
    "btn_view_file": "فائل دیکھیں",
    "lbl_linked_allocations": "منسلک امدادی مختصات",
    "lbl_total_colon": "کل:",
    "lbl_intake_case_ref": "کیس ریفرنس کے تحت رجسٹرڈ اندراج:",
    "badge_recorded": "درج شدہ",
  },

  pl: {
    lbl_effective_date: "Wchodzi w życie:",
    lbl_email_address: "Zarejestrowany adres e-mail *",
    modal_allocation_cert_notice: "Ten pakiet pomocy został oficjalnie sprawdzony i zatwierdzony przez The Zinthiya Trust dla beneficjenta",
    effective_date_label: "Data wejścia w życie / wypłaty",
    funding_auth_label: "Partner finansujący i autoryzacja",
    permitted_terms_label: "Dozwolone użycie i warunki",
    conversations_sub: "Przełączaj między aktywnymi dyskusjami a archiwalnymi zapisami pomocy.",
    advocate_info_btn: "Informacje o opiekunie i linia bezpośrednia →",
    no_notifications_sub: "Brak aktywnych alertów. Zweryfikowane aktualizacje dotyczące Twoich wniosków, dotacji i wiadomości od opiekuna pojawią się tutaj w czasie rzeczywistym.",

    // Nav
    portal_badge: "PORTAL BENEFICJENTA",
    nav_dashboard: "Panel główny",
    nav_profile: "Mój profil",
    nav_assistance: "Przyznana pomoc",
    nav_history: "Historia wsparcia",
    nav_messages: "Wiadomości / Opiekun",
    nav_notifications: "Powiadomienia",
    nav_language: "Ustawienia języka",
    nav_logout: "Wyloguj się",
    helpline_title: "Infolinia wsparcia",
    helpline_hours: "Pn - Pt, 9:00 - 16:30",

    // Header
    client_care_portal: "Portal opieki nad klientem",
    caseworker_prefix: "Opiekun:",
    crisis_advocate_badge: "Dedykowany doradca kryzysowy",
    btn_request_support: "+ Poproś o pomoc",
    btn_logout: "Wyloguj się",

    // Dashboard
    welcome_back: "Witaj ponownie",
    active_beneficiary: "AKTYWNY BENEFICJENT",
    case_ref: "Nr sprawy:",
    gdpr_verified: "Konto zweryfikowane UK GDPR",
    display_currency: "Waluta wyświetlania:",
    registered_contact: "Zarejestrowany kontakt",
    registered_home_address: "Zarejestrowany adres",
    dedicated_worker: "Dedykowany pracownik kryzysowy",
    case_support_status: "Status wsparcia",
    active_support: "Aktywne wsparcie",
    stat_total_allocated: "Łączna przyznana pomoc",
    stat_distributed: "Wypłacono do tej pory",
    stat_pending_payout: "Oczekujące wypłaty",
    stat_pending_requests: "Oczekujące wnioski",
    stat_caseworker: "Dedykowany opiekun",
    stat_unread_messages: "Nieprzeczytane wiadomości",
    quick_actions: "Szybkie akcje",
    qa_send_message: "Wyślij wiadomość do opiekuna",
    qa_view_grants: "Zobacz dotacje i przydziały",
    qa_emergency_line: "Infolinia kryzysowa",
    recent_activity: "Ostatnia aktywność i alerty",
    no_recent_activity: "Brak zarejestrowanej ostatniej aktywności.",
    active_allocations_title: "Aktywne przydziały",
    no_active_allocations: "Nie znaleziono aktywnych przydziałów.",
    view_all: "Pokaż wszystko",

    // Profile
    profile_title: "Profil klienta i dokumentacja",
    profile_subtitle: "Twoje zweryfikowane dane rejestracyjne, przydzielony opiekun i kontakty alarmowe.",
    personal_details: "Dane osobowe",
    full_name: "Imię i nazwisko",
    client_ref: "Numer referencyjny klienta",
    dob: "Data urodzenia",
    gender: "Płeć",
    primary_language: "Język podstawowy",
    contact_details: "Dane kontaktowe",
    email_address: "Adres e-mail",
    phone_number: "Numer telefonu",
    residential_address: "Adres zamieszkania",
    council_area: "Obszar gminy / Council",
    emergency_contact: "Kontakt alarmowy",
    next_of_kin: "Osoba najbliższa",
    emergency_phone: "Telefon alarmowy",
    casework_assignment: "Przydział opiekuna",
    assigned_advocate: "Przydzielony doradca",
    secondary_worker: "Dyżurny doradca socjalny",
    case_status: "Status sprawy",
    support_type: "Rodzaj wsparcia",
    household_size: "Wielkość gospodarstwa",
    change_password: "Zmień hasło",
    current_password: "Aktualne hasło",
    new_password: "Nowe hasło",
    confirm_new_password: "Potwierdź nowe hasło",
    btn_update_password: "Zaktualizuj hasło",

    // Allocated Assistance
    assistance_title: "Przyznana pomoc i rejestr dotacji",
    assistance_subtitle: "Zatwierdzone wsparcie finansowe i kryzysowe przydzielone przez The Zinthiya Trust.",
    filter_all: "Wszystkie zatwierdzone",
    filter_pending: "Oczekujące na wypłatę",
    filter_distributed: "Wypłacone",
    alloc_amount: "Kwota przyznanej pomocy",
    alloc_date: "Data przydziału",
    alloc_purpose: "Cel przydziału",
    alloc_method: "Metoda wypłaty",
    alloc_award_letter: "Pismo o przyznaniu (PDF)",
    download_pdf: "Pobieranie oficjalnego zawiadomienia PDF...",
    no_allocations_found: "Brak przydziałów spełniających kryteria.",

    // Support History
    history_title: "Historia wsparcia i rejestr wniosków",
    history_subtitle: "Śledź swoje przeszłe i aktywne wnioski o pomoc.",
    col_category: "Kategoria usługi / potrzeby",
    col_date: "Data wniosku",
    col_urgency: "Poziom pilności",
    col_status: "Status",
    col_worker: "Przydzielony pracownik",
    col_notes: "Uwagi do wniosku",
    no_history_records: "Brak zarejestrowanych wniosków.",

    // Messages / Advocate
    translation_banner_title: "Automatyczne wykrywanie języka i tłumaczenie w czasie rzeczywistym",
    translation_banner_sub: "Pisz w swoim języku ojczystym. Wiadomości są automatycznie tłumaczone dla Twojego opiekuna.",
    translate_into: "Przetłumacz na:",
    auto_translate: "Autotłumaczenie",
    btn_request_interpreter: "+ Poproś o tłumacza na żywo",
    interpreter_requested: "Poproszono o tłumacza na żywo",
    threads_title: "Rozmowy i wątki spraw",
    active_thread_title: "Bezpośrednia komunikacja z opiekunem",
    direct_caseworker: "Bezpośredni opiekun:",
    gdpr_encrypted: "Szyfrowanie UK GDPR 256-Bit",
    encrypted_banner: "Wiadomości w tym wątku są poufne i szyfrowane zgodnie z brytyjskim prawem o organizacjach charytatywnych.",
    no_messages_yet: "Brak wiadomości",
    no_messages_sub: "Napisz wiadomość poniżej, aby skontaktować się ze swoim opiekunem.",
    chat_placeholder: "Wpisz poufną wiadomość do opiekuna...",
    btn_send: "Wyślij",
    btn_voice_note: "Notatka głosowa",
    recording_text: "Nagrywanie głosu...",
    btn_stop_record: "Zatrzymaj i dołącz",
    btn_translate_msg: "Przetłumacz wiadomość",
    original_text: "Tekst oryginalny:",
    original_audio_transcript: "Oryginalna transkrypcja audio:",

    // Notifications
    notifications_title: "Powiadomienia i alerty",
    notifications_subtitle: "Aktualizacje dotyczące Twoich wniosków o pomoc i wiadomości.",
    btn_mark_all_read: "Oznacz wszystkie jako przeczytane",
    no_notifications: "Brak nowych powiadomień",

    // Language Settings
    lang_settings_title: "Ustawienia języka i preferencje tłumacza",
    lang_settings_subtitle: "Wybierz preferowany język. Zinthiya Trust zapewnia tłumaczenia dla wszelkiej korespondencji i spotkań.",
    btn_save_language: "Zapisz wybór języka",
    toast_lang_saved: "Preferencje językowe zostały pomyślnie zaktualizowane. Cała zawartość portalu jest teraz wyświetlana w wybranym języku.",

    // Modals
    modal_request_title: "Wniosek o pomoc lub wsparcie kryzysowe",
    modal_request_sub: "Twój wniosek trafia bezpośrednio do przydzielonego opiekuna",
    form_category: "Kategoria pomocy *",
    form_urgency: "Poziom pilności *",
    form_notes: "Szczegóły / Czego pilnie potrzebujesz *",
    form_notes_placeholder: "Podaj krótkie informacje o tym, czego pilnie potrzebujesz...",
    btn_cancel: "Anuluj",
    btn_submit_request: "Prześlij wniosek",
    submitting: "Przesyłanie...",
    modal_logout_title: "Potwierdź wylogowanie",
    modal_logout_desc: "Czy na pewno chcesz się wylogować z Portalu Beneficjenta?",
    kpi_distributed_sub: "Łączna zatwierdzona i wypłacona pomoc dla społeczności.",
    kpi_allocated_sub: "Bieżące aktywne dotacje i pomoc w trakcie realizacji.",
    advocate_details_title: "Szczegóły przydzielonego doradcy",
    active_advocate_badge: "AKTYWNY DORADCA",
    advocate_role_title: "Starszy doradca ds. opieki rodzinnej i kryzysowej",
    available_today: "• Dostępny na konsultacje dzisiaj",
    direct_helpline_label: "Bezpośrednia infolinia:",
    duty_email_label: "E-mail dyżurny:",
    duty_hours_text: "Godziny dyżuru: Pn – Pt, 9:00 – 16:30",
    btn_message_caseworker: "Napisz do opiekuna",
    btn_call_caseworker: "Zadzwoń do opiekuna",
    tab_recent_messages: "Ostatnie wiadomości",
    tab_notifications: "Powiadomienia",
    view_all_arrow: "Pokaż wszystko →",
    duty_office_badge: "Biuro dyżurne",
    welcome_portal_message: "\"Witamy w Portalu Klienta The Zinthiya Trust. Możesz przejrzeć swoje akta sprawy, sprawdzić przyznaną pomoc lub złożyć wniosek o wsparcie kryzysowe.\"",
    btn_open_advocate_thread: "Otwórz wątek wiadomości z opiekunem →",
    no_active_notifications: "Brak aktywnych powiadomień.",
    filter_all_records: "Wszystkie wpisy",
    filter_received: "Otrzymano",
    filter_approved: "Zatwierdzone",
    filter_cancelled: "Anulowane",
    filter_completed: "Zakończone",
    tab_applied_requests: "Złożone wnioski",
    col_assistance_type: "Rodzaj pomocy",
    col_amount: "Kwota",
    col_action: "Akcja",
    is_typing: "pisze...",
    approved_by_trustees: "ZATWIERDZONE PRZEZ POWIERNIKÓW",
    download_award_summary: "Pobierz podsumowanie przyznania (PDF)",
    active_allocations_count: "Aktywne przydziały",
    active_approved_grants: "Aktywne zatwierdzone dotacje",
    allocations_badge: "Przydziały",
    trustee_verified_auth: "100% Zweryfikowane i autoryzowane przez powierników",
    filter_disbursed_active: "Wypłacone i aktywne",
    btn_grant_cards: "Karty dotacji",
    btn_table_view: "Widok tabeli",
    search_assistance_placeholder: "Szukaj celu, dotacji, nr ref...",
    alloc_details_governance: "Szczegóły pomocy i zarządzanie",
    lbl_funding_partner: "Partner finansujący:",
    lbl_supervising_caseworker: "Opiekun nadzorujący:",
    lbl_disbursement_method: "Metoda wypłaty:",
    lbl_trustee_authority: "Organ zatwierdzający:",
    lbl_permitted_use: "Dozwolone przeznaczenie:",
    milestone_tracker_title: "Aktualny status i etapy realizacji",
    valid_through: "Ważne do:",
    current_relief_period: "Bieżący okres pomocowy",
    certified_care_charter: "Certyfikowane zgodnie z Kartą Opieki The Zinthiya Trust",
    btn_award_letter_pdf: "Pismo o przyznaniu (PDF)",
    btn_view_full_details: "Zobacz pełne szczegóły →",
    view_details: "Zobacz szczegóły",
    tbl_col_allocated_amount: "Kwota przyznana",
    tbl_col_purpose_ref: "Cel przydziału",
    tbl_col_alloc_date: "Data przydziału",
    tbl_col_current_status: "Aktualny status",
    tbl_col_details_action: "Szczegóły i akcja",
    btn_close: "Zamknij",
    btn_print_notice: "Drukuj zawiadomienie o przydziale",
    advocate_dossier_title: "Dokumentacja przydzielonego doradcy",
    btn_book_appointment: "Umów wizytę",
    lbl_preferred_name: "Preferowane imię / Zwrot grzecznościowy *",
    lbl_preferred_lang: "Preferowany język rozmowy i korespondencji",
    btn_save_personal_info: "Zapisz dane osobowe",
    btn_save_contact_details: "Zapisz dane kontaktowe",
    "badge_support_archive": "ARCHIWUM WSPARCIA",
    "lbl_case_ref": "Nr sprawy:",
    "kpi_support_received": "OTRZYMANE WSPARCIE",
    "kpi_disbursed_received": "Dotacje wypłacone i otrzymane",
    "kpi_allocated_support": "PRZYZNANE WSPARCIE",
    "kpi_pending_payout": "Dotacje oczekujące na wypłatę",
    "kpi_total_tracked": "ŁĄCZNA ŚLEDZONA POMOC",
    "kpi_records": "Wpisów",
    "kpi_casework_ledger_active": "Oficjalny rejestr spraw aktywny",
    "status_received": "Otrzymano",
    "status_approved": "Zatwierdzone",
    "th_assistance_type": "Rodzaj pomocy",
    "th_amount": "Kwota",
    "th_status": "Status",
    "th_date": "Data",
    "th_action": "Akcja",
    "btn_view_details": "Pokaż szczegóły",
    "lbl_submitted_by_client": "Złożone przez klienta",
    "lbl_allocated_prefix": "Przyznano: ",
    "footer_certified_ledger": "Poświadczony oficjalny rejestr pomocy dla {name} • UK Charity No. 1137350.",
    "milestones_title": "Kamienie milowe i oś czasu sprawy",
    "milestones_sub": "Historia konsultacji, wypłat dotacji i zakończonych ocen krok po kroku.",
    "step_intake_assigned": "PRZYJĘCIE SPRAWY I PRZYDZIELENIE OPIEKUNA",
    "step_account_active": "Konto beneficjenta aktywne i zweryfikowane",
    "step_intake_desc": "Klient zarejestrowany na portalu Zinthiya Trust. Przydzielono dedykowanego doradcę.",
    "btn_download_ledger": "Pobierz oficjalny rejestr wsparcia",
    "modal_assistance_details": "Szczegóły pomocy",
    "lbl_allocated_funds_title": "Przydzielone środki z wniosków o wsparcie",
    "lbl_total_allocated_prefix": "Łącznie przyznano: ",
    "lbl_admin_feedback": "Uwagi i opinia administratora:",
    "btn_download_statement": "Pobierz zestawienie",
    "lbl_credentials": "Kwalifikacje zawodowe:",
    "lbl_badge_id": "Identyfikator doradcy:",
    "lbl_office_hours": "Godziny pracy:",
    "lbl_office_loc": "Lokalizacja biura:",
    "lbl_casework_languages": "Języki obsługi spraw:",
    "lbl_advocate_bio": "Doświadczenie i profil doradcy",
    "urgency_high": "Wysoki priorytet (Pilne potrzeby w ciągu 24-48 godz.)",
    "urgency_critical": "Krytyczny wypadek (Natychmiastowy kryzys)",
    "urgency_medium": "Standardowe wsparcie (Najbliższe 3-5 dni roboczych)",
    "lbl_supporting_docs": "Dokumenty uzupełniające",
    "lbl_attach_docs_hint": "Dołącz rachunki, pisma, powiadomienia, dokumenty tożsamości",
    "btn_add_supporting_docs": "+ Dodaj dokumenty uzupełniające (można wybrać kilka)",
    "profile_personal_sub": "Przeglądaj oficjalne dane i aktualizuj dozwolone dane identyfikacyjne klienta.",
    "lbl_full_legal_name": "Pełne imię i nazwisko (zapis oficjalny)",
    "lbl_verified_record": "Zweryfikowany zapis",
    "lbl_legal_name_hint": "Aby zaktualizować oficjalne imię i nazwisko, wymagana jest weryfikacja tożsamości przez doradcę.",
    "lbl_preferred_salutation": "Preferowane imię / Forma zwrotu *",
    "lbl_preferred_name_hint": "Jak wolisz, aby doradcy i pracownicy wsparcia zwracali się do Ciebie.",
    "lbl_case_reference_num": "Numer referencyjny sprawy klienta",
    "lbl_dob_verified": "Data urodzenia (zweryfikowana)",
    "lbl_pref_spoken_written": "Preferowany język w mowie i piśmie",
    "lbl_interpreter_session": "Akredytowany tłumacz na spotkania osobiste",
    "opt_not_required": "Niewymagany",
    "opt_require_interpreter": "Wymagany tłumacz",
    "profile_contact_sub": "Zarządzaj numerami telefonów, adresem e-mail i danymi kontaktowymi w nagłych wypadkach.",
    "lbl_primary_phone": "Główny numer telefonu komórkowego *",
    "lbl_secondary_phone": "Alternatywny / domowy numer stacjonarny (opcjonalnie)",
    "lbl_preferred_contact_method": "Preferowany sposób kontaktu",
    "lbl_best_time_to_call": "Najlepszy czas na telefon",
    "lbl_emergency_name": "Imię i nazwisko osoby do kontaktu w nagłych wypadkach",
    "lbl_emergency_phone": "Numer telefonu w nagłych wypadkach",
    "lbl_emergency_rel": "Relacja z osobą do kontaktu w nagłych wypadkach",
    "profile_housing_sub": "Upewnij się, że zarejestrowane miejsce zamieszkania jest poprawne dla bonów na media, dostaw i świadczeń komunalnych.",
    "lbl_proof_verified": "DOWÓD ZWERYFIKOWANY",
    "lbl_address_line1": "Adres linia 1 (Ulica i numer domu) *",
    "lbl_address_line2": "Adres linia 2 (Mieszkanie / Apartament - opcjonalnie)",
    "lbl_city": "Miejscowość / Miasto *",
    "lbl_postcode": "Kod pocztowy *",
    "lbl_housing_tenure": "Tytuł prawny do lokalu i sytuacja mieszkaniowa",
    "btn_save_address": "Zapisz dane adresowe",
    "profile_security_title": "Zarządzanie bezpieczeństwem i hasłem",
    "profile_security_sub": "Upewnij się, że Twoje konto jest chronione silnym, poufnym hasłem.",
    "lbl_current_pw": "Aktualne hasło *",
    "lbl_new_pw": "Nowe hasło *",
    "lbl_confirm_new_pw": "Potwierdź nowe hasło *",
    "gdpr_notice_title": "Ochrona danych UK GDPR i dozwolone zmiany",
    "gdpr_notice_desc": "Możesz w każdej chwili samodzielnie zaktualizować swoje preferowane imię, numery telefonów, adres e-mail, adres zamieszkania, metody komunikacji i hasło. Zmiany imienia i nazwiska prawnego, daty urodzenia lub zarejestrowanych osób na utrzymaniu wymagają weryfikacji tożsamości przez doradcę.",
    "online_duty_caseworker": "Dostępny • Doradca dyżurny",
    "typically_replies": "Zazwyczaj odpowiada w ciągu 2 godzin w godzinach dyżuru",
    "btn_call_advocate": "Zadzwoń do doradcy",
    "btn_view_advocate_profile": "Zobacz pełny profil doradcy",
    "advocate_spoken_langs": "Języki doradcy:",
    "btn_stop_send_voice": "Zatrzymaj i wyślij notatkę głosową",
    "lbl_playing_audio": "Odtwarzanie dźwięku...",
    "lbl_voice_message": "Wiadomość głosowa",
    "lbl_show_orig_transcript": "Pokaż oryginalną transkrypcję audio",
    "lbl_translate_transcript": "Przetłumacz transkrypcję audio",
    "lbl_translating": "Tłumaczenie...",
    "lbl_recording_voice": "Nagrywanie notatki głosowej...",
    "urgent_emergency_title": "Pilna sprawa awaryjna?",
    "urgent_emergency_desc": "Jeśli odłączono Ci dostawę energii lub pilnie potrzebujesz schronienia kryzysowego, natychmiast zadzwoń do dyżurki pod numer 0116 254 5168.",
    "msg_pw_changed_success": "Twoje hasło zostało pomyślnie zmienione.",
    "btn_save": "Zapisz",
    "lbl_show_original": "Pokaż oryginalną wiadomość",
    "lbl_show_orig_en": "Pokaż oryginał (angielski)",
    "btn_translate_into": "Przetłumacz na",
    "lbl_note_relocating": "Uwaga dotycząca przeprowadzki:",
    "desc_note_relocating": "Jeśli przeprowadzasz się do nowego miejsca zamieszkania, aktualizacja powyższego adresu gwarantuje, że paczki żywnościowe i bony na media zostaną wysłane do Twojego obecnego domu. Twój doradca może poprosić o zdjęcie nowej umowy najmu lub rachunku Council Tax.",
    "lbl_app_stage": "Etap wniosku",
    "lbl_award_amount": "Kwota przyznana",
    "lbl_reference_id": "Identyfikator referencyjny",
    "lbl_submitted_for_approval": "Złożone do zatwierdzenia przez administratora:",
    "lbl_assistance_notes": "Zakres pomocy i uwagi:",
    "lbl_supporting_docs_approval": "Dokumenty uzupełniające przekazane do zatwierdzenia",
    "btn_view_file": "Zobacz plik",
    "lbl_linked_allocations": "Powiązane przydziały pomocy",
    "lbl_total_colon": "Łącznie:",
    "lbl_intake_case_ref": "Rejestracja przyjęcia pod nr sprawy:",
    "badge_recorded": "ZAREJESTROWANO",
  },

  so: {
    lbl_effective_date: "Dhaqangalka:",
    lbl_email_address: "Cinwaanka Iimaylka ee Diiwaangashan *",
    modal_allocation_cert_notice: "Xirmadan gargaarka waxaa si rasmi ah u dib-u-eegay una oggolaaday The Zinthiya Trust qofka ka faa'iideysanaya",
    effective_date_label: "Taariikhda Dhaqangalka / Bixinta",
    funding_auth_label: "Wada-hawlgalayaasha Maalgelinta & Oggolaanshaha",
    permitted_terms_label: "Isticmaalka La Oggol yahay & Shuruudaha",
    conversations_sub: "U kala beddel doodaha kiisaska firfircoon iyo diiwaannada gargaarka ee hore loo xalliyey.",
    advocate_info_btn: "Macluumaadka U-doodaha & Khadka Tooska ah →",
    no_notifications_sub: "Ma jiraan digniino firfircoon. Wararka la xaqiijiyay ee ku saabsan deeqahaaga degdegga ah, codsiyada, iyo farriimaha shaqaalaha kiiska waxay halkan kaga soo muuqan doonaan waqtiga dhabta ah.",

    // Nav
    portal_badge: "BOGGA KAALMADA",
    nav_dashboard: "Bogga Hore",
    nav_profile: "Xogtayda",
    nav_assistance: "Kaalmada La Qoondeeyay",
    nav_history: "Taariikhda Kaalmada",
    nav_messages: "Farriimaha / U doodaha",
    nav_notifications: "Ogeysiisyada",
    nav_language: "Dejinta Luuqadda",
    nav_logout: "Ka bax",
    helpline_title: "Khadka Caawinta",
    helpline_hours: "Isniin - Jimce, 9:00 subaxnimo - 4:30 galabnimo",

    // Header
    client_care_portal: "Xarunta Daryeelka Macmiilka",
    caseworker_prefix: "Shaqaalaha kiiska:",
    crisis_advocate_badge: "U doode Khaas ah",
    btn_request_support: "+ Dalbo Kaalmo",
    btn_logout: "Ka bax",

    // Dashboard
    welcome_back: "Kusoo dhawow",
    active_beneficiary: "MACMIIL FIRFIRCOON",
    case_ref: "Tixraaca Kiiska:",
    gdpr_verified: "Xisaab UK GDPR Xaqiijisay",
    display_currency: "Lacagta la muujinayo:",
    registered_contact: "Xiriirka Diiwaangashan",
    registered_home_address: "Cinwaanka Guriga",
    dedicated_worker: "Shaqaalaha Xasaradaha",
    case_support_status: "Xaaladda Kiiska",
    active_support: "Kaalmo Firfircoon",
    stat_total_allocated: "Wadarta Kaalmada La Qoondeeyay",
    stat_distributed: "Ilaa Hada La Bixiyay",
    stat_pending_payout: "Lacagta Dhiman",
    stat_pending_requests: "Codsiyada Sugaya",
    stat_caseworker: "Shaqaalaha Gaarka ah",
    stat_unread_messages: "Farriimaha aan la akhriyin",
    quick_actions: "Tallaabooyinka Degdegga ah",
    qa_send_message: "Farriin u dir shaqaalaha kiiska",
    qa_view_grants: "Eeg Deeqaha iyo Qoondeynta",
    qa_emergency_line: "Khadka Degdegga ah",
    recent_activity: "Dhaqdhaqaaqyadii Ugu Dambeeyay",
    no_recent_activity: "Wax dhaqdhaqaaq ah ma jiro.",
    active_allocations_title: "Qoondeynta Firfircoon",
    no_active_allocations: "Wax qoondeyn firfircoon ah lama helin.",
    view_all: "Eeg Dhammaan",

    // Profile
    profile_title: "Xogta Macmiilka",
    profile_subtitle: "Faahfaahintaada diiwaangashan iyo xiriirada degdegga ah.",
    personal_details: "Faahfaahinta Shakhsiga",
    full_name: "Magaca oo Buuxa",
    client_ref: "Lambarka Tixraaca",
    dob: "Taariikhda Dhalashada",
    gender: "Jinsiga",
    primary_language: "Luuqadda Koowaad",
    contact_details: "Faahfaahinta Xiriirka",
    email_address: "Cinwaanka Emailka",
    phone_number: "Lambarka Telefoonka",
    residential_address: "Cinwaanka Hoyga",
    council_area: "Aagga Golaha",
    emergency_contact: "Xiriirka Degdegga ah",
    next_of_kin: "Qofka Xiga",
    emergency_phone: "Telefoonka Degdegga ah",
    casework_assignment: "Shaqaalaha Kiiska",
    assigned_advocate: "U doodaha Laguu Qabtay",
    secondary_worker: "Shaqaalaha Caawinta",
    case_status: "Xaaladda Kiiska",
    support_type: "Nooca Kaalmada",
    household_size: "Tirada Qoyska",
    change_password: "Beddel Furaha Sirta ah",
    current_password: "Furaha Hadda",
    new_password: "Fure Cusub",
    confirm_new_password: "Xaqiiji Furaha Cusub",
    btn_update_password: "Cusbooneysii Furaha",

    // Allocated Assistance
    assistance_title: "Kaalmada La Qoondeeyay iyo Deeqaha",
    assistance_subtitle: "Kaalmada maaliyadeed ee uu ansixiyay Zinthiya Trust.",
    filter_all: "Dhammaan La Ansixiyay",
    filter_pending: "Lacagta Dhiman",
    filter_distributed: "La Bixiyay",
    alloc_amount: "Xaddiga Kaalmada",
    alloc_date: "Taariikhda Qoondeynta",
    alloc_purpose: "Ujeeddada Kaalmada",
    alloc_method: "Habka Bixinta",
    alloc_award_letter: "Warqadda Deeqda (PDF)",
    download_pdf: "Waxaa la soo dejinayaa PDF...",
    no_allocations_found: "Waxba lama helin.",

    // Support History
    history_title: "Taariikhda Kaalmada",
    history_subtitle: "La soco codsiyadaada iyo xaaladdooda.",
    col_category: "Qaybta Adeegga",
    col_date: "Taariikhda Codsiga",
    col_urgency: "Heerka Degdegga",
    col_status: "Xaaladda",
    col_worker: "Shaqaalaha Kiiska",
    col_notes: "Qoraalka Codsiga",
    no_history_records: "Wax codsi ah ma jiraan.",

    // Messages / Advocate
    translation_banner_title: "Aqoonsiga Luuqadda iyo Turjumaad Toos ah",
    translation_banner_sub: "Ku qor afkaaga hooyo. Farriimaha si toos ah ayaa loogu turjumayaa shaqaalaha kiiskaaga.",
    translate_into: "U turjun:",
    auto_translate: "Turjumaad Toos ah",
    btn_request_interpreter: "+ Dalbo Turjubaan Toos ah",
    interpreter_requested: "Turjubaan waa la dalbaday",
    threads_title: "Wadahadallada",
    active_thread_title: "Wadahadalka Tooska ah ee Kiiska",
    direct_caseworker: "Shaqaalaha Tooska ah:",
    gdpr_encrypted: "UK GDPR 256-Bit Qarsoodi ah",
    encrypted_banner: "Farriimaha halkan ku jira waa kuwo sir ah oo sharciga UK ilaalinayo.",
    no_messages_yet: "Wali wax farriin ah ma jiraan",
    no_messages_sub: "Hoos ku qor farriin si aad ula hadasho shaqaalaha kiiskaaga.",
    chat_placeholder: "Qor farriin qarsoodi ah...",
    btn_send: "Dir",
    btn_voice_note: "Cod duub",
    recording_text: "Cod baa la duubayaa...",
    btn_stop_record: "Jooji oo ku lifaaq",
    btn_translate_msg: "Turjun Farriinta",
    original_text: "Qoraalkii Asalka ahaa:",
    original_audio_transcript: "Codkii Asalka ahaa:",

    // Notifications
    notifications_title: "Ogeysiisyada",
    notifications_subtitle: "Wararkii ugu dambeeyay ee codsiyadaada iyo farriimahaaga.",
    btn_mark_all_read: "Kala calaamadee dhammaan kuwo la akhriyay",
    no_notifications: "Wax ogeysiis cusub ah ma jiraan",

    // Language Settings
    lang_settings_title: "Dejinta Luuqadda iyo Turjubaanka",
    lang_settings_subtitle: "Dooro luuqaddaada. Zinthiya Trust waxay bixisaa turjumaad rasmi ah.",
    btn_save_language: "Keydi Xulashada Luuqadda",
    toast_lang_saved: "Luuqadda si guul leh ayaa loo beddelay. Dhammaan macluumaadka bogga hadda waxay ku qoran yihiin luuqadda aad dooratay.",

    // Modals
    modal_request_title: "Dalbo Kaalmo ama Caawinaad Degdeg ah",
    modal_request_sub: "Codsigaagu wuxuu toos u aadayaa shaqaalaha kiiskaaga",
    form_category: "Qaybta Kaalmada *",
    form_urgency: "Heerka Degdegga *",
    form_notes: "Faahfaahin / Waxaad u baahan tahay *",
    form_notes_placeholder: "Qor waxa aad degdegga ugu baahan tahay...",
    btn_cancel: "Jooji",
    btn_submit_request: "Gudbi Codsiga",
    submitting: "Waa la gudbinayaa...",
    modal_logout_title: "Xaqiiji Ka bixitaanka",
    modal_logout_desc: "Ma hubtaa inaad doonayso inaad ka baxdo bogga?",
    kpi_distributed_sub: "Wadarta gargaarka bulshada ee la ansixiyay laguna wareejiyay.",
    kpi_allocated_sub: "Deeqaha iyo kaalmada hadda shaqaynaysa ee la fulinayo.",
    advocate_details_title: "Faahfaahinta U Doodaha Laguu Qoondeeyay",
    active_advocate_badge: "U DOODE SHAQAYNAYA",
    advocate_role_title: "U Doodaha Sare ee Daryeelka Qoyska & Xasaradaha",
    available_today: "• Diyaar u ah La-talinta Maanta",
    direct_helpline_label: "Khadka Tooska ah:",
    duty_email_label: "Iimaylka Shaqada:",
    duty_hours_text: "Saacadaha Shaqada: Isniin – Jimco, 9:00 subaxnimo – 4:30 galabnimo",
    btn_message_caseworker: "Fariin u Dir U Doodaha",
    btn_call_caseworker: "Wac U Doodaha",
    tab_recent_messages: "Farriimihii ugu dambeeyay",
    tab_notifications: "Ogeysiisyada",
    view_all_arrow: "Eeg dhammaan →",
    duty_office_badge: "Xafiiska Shaqada",
    welcome_portal_message: "\"Ku soo dhawoow bogga macaamiisha ee Zinthiya Trust. Waxaad dib u eegi kartaa faylkaaga, hubin kartaa kaalmada laguu qoondeeyay, ama codsan kartaa gargaar degdeg ah.\"",
    btn_open_advocate_thread: "Fur Qoraalka Farriinta U Doodaha →",
    no_active_notifications: "Wax ogeysiisyo ah ma jiraan.",
    filter_all_records: "Dhammaan Diiwaannada",
    filter_received: "La helay",
    filter_approved: "La ansixiyay",
    filter_cancelled: "La kansalay",
    filter_completed: "Dhameystiran",
    tab_applied_requests: "Codsiyada La Gudbiyay",
    col_assistance_type: "Nooca Kaalmada",
    col_amount: "Qadarka",
    col_action: "Tallaabo",
    is_typing: "ayaa wax qoraya...",
    approved_by_trustees: "GUDDIGA OO ANSIXIYAY",
    download_award_summary: "Soo Degso Warbixinta Abaalmarinta (PDF)",
    active_allocations_count: "Qoondada Shaqaynaysa",
    active_approved_grants: "Deeqaha La Ansixiyay ee Shaqaynaya",
    allocations_badge: "Qoondooyinka",
    trustee_verified_auth: "100% Xaqiijiyay oo Oggolaaday Guddiga",
    filter_disbursed_active: "La bixiyay & Shaqaynaya",
    btn_grant_cards: "Kaadhadhka Deeqaha",
    btn_table_view: "Muuqaalka Shaxda",
    search_assistance_placeholder: "Raadi ujeedada, deeqda, tixraaca...",
    alloc_details_governance: "Faahfaahinta Kaalmada & Maamulka",
    lbl_funding_partner: "Wadada Maalgelinta:",
    lbl_supervising_caseworker: "U Doodaha Kormeerka:",
    lbl_disbursement_method: "Habka Bixinta:",
    lbl_trustee_authority: "Awoodda Guddiga:",
    lbl_permitted_use: "Isticmaalka La Oggol yahay:",
    milestone_tracker_title: "Xaaladda Hadda & Raadraaca Tallaabooyinka",
    valid_through: "Waqtiga uu Shaqaynayo:",
    current_relief_period: "Xilliga Gargaarka ee Hadda",
    certified_care_charter: "Ku Shahaadaysan Sharciga Daryeelka Zinthiya Trust",
    btn_award_letter_pdf: "Warqadda Deeqda (PDF)",
    btn_view_full_details: "Eeg Faahfaahinta Buuxda →",
    view_details: "Eeg Faahfaahinta",
    tbl_col_allocated_amount: "Qadarka La Qoondeeyay",
    tbl_col_purpose_ref: "Ujeeddada Qoondada",
    tbl_col_alloc_date: "Taariikhda Qoondada",
    tbl_col_current_status: "Xaaladda Hadda",
    tbl_col_details_action: "Faahfaahinta & Tallaabada",
    btn_close: "Xidh",
    btn_print_notice: "Daabac Ogeysiiska Qoondada",
    advocate_dossier_title: "Faylka U Doodaha Laguu Qoondeeyay",
    btn_book_appointment: "Qabso Ballan",
    lbl_preferred_name: "Magaca Aad Jeceshahay *",
    lbl_preferred_lang: "Luuqadda Aad Ku Hadasho & Ku Qorto",
    btn_save_personal_info: "Kaydi Xogta Gaarka ah",
    btn_save_contact_details: "Kaydi Faahfaahinta Xidhiidhka",
    "badge_support_archive": "KAYDKA TAAGEERADA",
    "lbl_case_ref": "Tixraaca Dacwada:",
    "kpi_support_received": "TAAGEERO LA HELAY",
    "kpi_disbursed_received": "Deeqaha La Bixiyay & La Helay",
    "kpi_allocated_support": "TAAGEERO LA QOONDHEEYAY",
    "kpi_pending_payout": "Deeqaha Sugaya Bixinta",
    "kpi_total_tracked": "WADARTA TAAGEERADA LA SOCDO",
    "kpi_records": "Diiwaano",
    "kpi_casework_ledger_active": "Diiwaanka Rasmiga ah ee Kiiska Wuu Shaqeynayaa",
    "status_received": "La Helay",
    "status_approved": "La Anxiyay",
    "th_assistance_type": "Nooca Taageerada",
    "th_amount": "Qadarka",
    "th_status": "Xaaladda",
    "th_date": "Taariikhda",
    "th_action": "Tallaabo",
    "btn_view_details": "Fiiri Faahfaahinta",
    "lbl_submitted_by_client": "Macaamiilku gudbiyay",
    "lbl_allocated_prefix": "La Qoondeeyay: ",
    "footer_certified_ledger": "Diiwaanka taageerada rasmiga ah ee shahaadaysan ee {name} • UK Charity No. 1137350.",
    "milestones_title": "Guulaha Kiiska & Jadwalka",
    "milestones_sub": "Taariikhda wadatashiyada, bixinta deeqaha, iyo qiimaynta la dhamaystiray tallaabo-tallaabo.",
    "step_intake_assigned": "QAADASHADA KIISKA & MAGACAABISTA QAREENKA",
    "step_account_active": "Akoonka Ka-faa'iideystaha Wuu Shaqeynayaa & Waa La Xaqiijiyay",
    "step_intake_desc": "Macaamiilka ayaa ka diiwaan gashan Zinthiya Trust Portal. Waxaa loo qoondeeyay shaqaale daryeel.",
    "btn_download_ledger": "Soo Degso Diiwaanka Taageerada Rasmiga ah",
    "modal_assistance_details": "Faahfaahinta Taageerada",
    "lbl_allocated_funds_title": "Lacagta Loogu Qoondeeyay Codsiyada Taageerada",
    "lbl_total_allocated_prefix": "Wadarta La Qoondeeyay: ",
    "lbl_admin_feedback": "Qoraalada Dib-u-eegista Maamulka & Faallooyinka:",
    "btn_download_statement": "Soo Degso Bayaanka",
    "lbl_credentials": "Shahaadooyinka Xirfadeed:",
    "lbl_badge_id": "Aqoonsiga Calaamadda Qareenka:",
    "lbl_office_hours": "Saacadaha Shaqada Xafiiska:",
    "lbl_office_loc": "Goobta Xafiiska:",
    "lbl_casework_languages": "Luqadaha Kiiska:",
    "lbl_advocate_bio": "Taariikhda Qareenka",
    "urgency_high": "Mudnaanta Sare (Baahiyo Degdeg ah 24-48 saac gudahood)",
    "urgency_critical": "Xaalad Degdeg ah oo Halis ah (Qalalaase Degdeg ah)",
    "urgency_medium": "Taageerada Caadiga ah (3-5 Maalmood ee Shaqada ee Soo Socda)",
    "lbl_supporting_docs": "Dukumentiyada Taageeraya",
    "lbl_attach_docs_hint": "Ku lifaaq biilasha, waraaqaha, ogeysiisyada, aqoonsiga",
    "btn_add_supporting_docs": "+ Ku dar Dukumentiyada Taageeraya (Dhowr waa la oggol yahay)",
    "profile_personal_sub": "Eeg diiwaanada rasmiga ah oo cusboonaysii faahfaahinta aqoonsiga.",
    "lbl_full_legal_name": "Magaca Sharciga ah ee Buuxa (Diiwaanka Rasmiga ah)",
    "lbl_verified_record": "Diiwaanka La Xaqiijiyay",
    "lbl_legal_name_hint": "Si aad u cusboonaysiiso magacaaga rasmiga ah, xaqiijinta aqoonsiga daryeelaha ayaa loo baahan yahay.",
    "lbl_preferred_salutation": "Magaca La Doonayo / Cinwaanka *",
    "lbl_preferred_name_hint": "Sida aad doorbidayso in shaqaalaha daryeelku kuugu yeedhaan.",
    "lbl_case_reference_num": "Lambarka Tixraaca Kiiska Macmiilka",
    "lbl_dob_verified": "Taariikhda Dhalashada (La Xaqiijiyay)",
    "lbl_pref_spoken_written": "Luqadda La Doorbiday ee Lagu Hadlo & Lagu Qoro",
    "lbl_interpreter_session": "Turjumaan La Aqoonsan yahay oo loogu talagalay Kulamada Tooska ah",
    "opt_not_required": "Looma baahna",
    "opt_require_interpreter": "Waxaa loo baahan yahay Turjumaan",
    "profile_contact_sub": "Maamul lambarada taleefankaaga, iimaylka, iyo xiriirka degdegga ah.",
    "lbl_primary_phone": "Lambarka Taleefanka Gacanta ee Koowaad *",
    "lbl_secondary_phone": "Taleefan Kale / Khadka Guriga (Ikhtiyaari)",
    "lbl_preferred_contact_method": "Habka Xiriirka ee La Doorbiday",
    "lbl_best_time_to_call": "Waqtiga ugu Wanaagsan ee La Wici Karo",
    "lbl_emergency_name": "Magaca Qofka Kuugu Dhow Xaaladaha Degdegga ah",
    "lbl_emergency_phone": "Lambarka Xiriirka Degdegga ah",
    "lbl_emergency_rel": "Xiriirka Qofka Degdegga ah",
    "profile_housing_sub": "Hubi in cinwaankaagu sax yahay foojarrada iyo gargaarka.",
    "lbl_proof_verified": "CADDEYN LA XAQIIJIYAY",
    "lbl_address_line1": "Cinwaanka Sadarka 1 (Waddada & Lambarka Guriga) *",
    "lbl_address_line2": "Cinwaanka Sadarka 2 (Guri / Dabaq - Ikhtiyaari)",
    "lbl_city": "Magaalada *",
    "lbl_postcode": "Boostada *",
    "lbl_housing_tenure": "Xaaladda Deegaanka & Guriga",
    "btn_save_address": "Kaydi Macluumaadka Cinwaanka",
    "profile_security_title": "Amniga & Maamulka Sirta",
    "profile_security_sub": "Hubi in akoonkaaga lagu ilaaliyo sir adag oo qarsoodi ah.",
    "lbl_current_pw": "Sirta Hadda *",
    "lbl_new_pw": "Sirta Cusub *",
    "lbl_confirm_new_pw": "Xaqiiji Sirta Cusub *",
    "gdpr_notice_title": "Ilaalinta Xogta UK GDPR & Isbeddelada La Oggol Yahay",
    "gdpr_notice_desc": "Waxaad cusboonaysiin kartaa magacaaga, taleefankaaga, cinwaankaaga iyo sirtaada wakhti kasta.",
    "online_duty_caseworker": "Toos ah • Shaqaalaha Daryeelka ee Shaqada ku jira",
    "typically_replies": "Sida caadiga ah waxay ku jawaabtaa 2 saacadood gudahood waqtiga shaqada",
    "btn_call_advocate": "Wac Qareenka",
    "btn_view_advocate_profile": "Fiiri Xogta Buuxda ee Qareenka",
    "advocate_spoken_langs": "Luqadaha uu Qareenku Ku Hadlo:",
    "btn_stop_send_voice": "Jooji & Dir Farriinta Codka",
    "lbl_playing_audio": "Dhageysiga codka...",
    "lbl_voice_message": "Farriinta Codka",
    "lbl_show_orig_transcript": "Muuji Qoraalka Codka Asalka ah",
    "lbl_translate_transcript": "Turjum Qoraalka Codka",
    "lbl_translating": "Waa la turjumayaa...",
    "lbl_recording_voice": "Duubista codka...",
    "urgent_emergency_title": "Kiis Degdeg ah?",
    "urgent_emergency_desc": "Haddii laydhka lagaa gooyay ama aad u baahan tahay hoy degdeg ah, wac 0116 254 5168.",
    "msg_pw_changed_success": "Sirtaada si guul leh ayaa loo beddelay.",
    "btn_save": "Kaydi",
    "lbl_show_original": "Muuji Farriinta Asalka ah",
    "lbl_show_orig_en": "Muuji Asalka (Ingiriisi)",
    "btn_translate_into": "U turjum",
    "lbl_note_relocating": "Xusuusin ku Saabsan Guuritaanka:",
    "desc_note_relocating": "Haddii aad guri cusub u guurto, cusboonaysiinta cinwaanka waxay xaqiijinaysaa in gargaarka laguu keeno.",
    "lbl_app_stage": "Heerka Codsiga",
    "lbl_award_amount": "Qadarka Deeqda",
    "lbl_reference_id": "Aqoonsiga Tixraaca",
    "lbl_submitted_for_approval": "Waxa Aad u Gudbisay Ansixinta Maamulka:",
    "lbl_assistance_notes": "Baaxadda Taageerada & Qoraalada:",
    "lbl_supporting_docs_approval": "Dukumentiyada Taageeraya ee Loo Gudbiyay Ansixinta",
    "btn_view_file": "Fiiri Faylka",
    "lbl_linked_allocations": "Qoondada Taageerada ee ku Xiran",
    "lbl_total_colon": "Wadarta:",
    "lbl_intake_case_ref": "Qaadashada ku diiwaangashan Tixraaca Kiiska:",
    "badge_recorded": "LA DIIWAANGELIYAY",
  },

  ar: {
    lbl_effective_date: "ساري المفعول:",
    lbl_email_address: "عنوان البريد الإلكتروني المسجل *",
    modal_allocation_cert_notice: "تمت مراجعة حزمة المساعدة هذه واعتمادها رسميًا من قبل صندوق زنثيا للمستفيد",
    effective_date_label: "تاريخ السريان / الصرف",
    funding_auth_label: "شريك التمويل والتفويض",
    permitted_terms_label: "الاستخدام المسموح به والشروط",
    conversations_sub: "التبديل بين مناقشات العمل الاجتماعي النشطة وسجلات المساعدة السابقة.",
    advocate_info_btn: "معلومات المستشار والخط المباشر ←",
    no_notifications_sub: "لا توجد تنبيهات نشطة. ستظهر التحديثات المعتمدة بشأن منح الطوارئ والطلبات ورسائل الأخصائي الاجتماعي هنا في الوقت الفعلي.",

    // Nav
    portal_badge: "بوابة المستفيدين",
    nav_dashboard: "لوحة التحكم",
    nav_profile: "ملفي الشخصي",
    nav_assistance: "المساعدات المخصصة",
    nav_history: "سجل الدعم",
    nav_messages: "الرسائل / المنسق",
    nav_notifications: "الإشعارات",
    nav_language: "إعدادات اللغة",
    nav_logout: "تسجيل الخروج",
    helpline_title: "خط المساعدة للحالات",
    helpline_hours: "الإثنين - الجمعة، 9:00 ص - 4:30 م",

    // Header
    client_care_portal: "بوابة رعاية العملاء",
    caseworker_prefix: "الأخصائي المسؤول:",
    crisis_advocate_badge: "منسق إدارة الأزمات المخصص",
    btn_request_support: "+ طلب الدعم",
    btn_logout: "تسجيل الخروج",

    // Dashboard
    welcome_back: "مرحبًا بك مجددًا",
    active_beneficiary: "مستفيد نشط",
    case_ref: "رقم مرجع الحالة:",
    gdpr_verified: "حساب موثق وفقًا لـ UK GDPR",
    display_currency: "عملة العرض:",
    registered_contact: "جهة الاتصال المسجلة",
    registered_home_address: "عنوان المنزل المسجل",
    dedicated_worker: "أخصائي الأزمات المخصص",
    case_support_status: "حالة دعم القضية",
    active_support: "دعم نشط",
    stat_total_allocated: "إجمالي الدعم المخصص",
    stat_distributed: "المصروف حتى تاريخه",
    stat_pending_payout: "دفعات الدعم المعلقة",
    stat_pending_requests: "الطلبات قيد المراجعة",
    stat_caseworker: "الأخصائي المخصص",
    stat_unread_messages: "الرسائل غير المقروءة",
    quick_actions: "إجراءات سريعة",
    qa_send_message: "إرسال رسالة إلى الأخصائي",
    qa_view_grants: "عرض المنح والتخصيصات",
    qa_emergency_line: "خط الطوارئ للمصاعب",
    recent_activity: "النشاط والتنبيهات الأخيرة",
    no_recent_activity: "لم يتم تسجيل أي نشاط حديث.",
    active_allocations_title: "التخصيصات النشطة",
    no_active_allocations: "لا توجد تخصيصات نشطة حاليًا.",
    view_all: "عرض الكل",

    // Profile
    profile_title: "ملف العميل وسجل الرعاية",
    profile_subtitle: "تفاصيل التسجيل المعتمدة، والمنسق المعين، وجهات الاتصال في حالات الطوارئ.",
    personal_details: "البيانات الشخصية",
    full_name: "الاسم الكامل",
    client_ref: "رقم مرجع العميل",
    dob: "تاريخ الميلاد",
    gender: "الجنس",
    primary_language: "اللغة الأساسية",
    contact_details: "بيانات الاتصال",
    email_address: "البريد الإلكتروني",
    phone_number: "رقم الهاتف",
    residential_address: "عنوان السكن",
    council_area: "منطقة البلدية",
    emergency_contact: "جهة اتصال الطوارئ",
    next_of_kin: "صلة القرابة / الاسم",
    emergency_phone: "هاتف الطوارئ",
    casework_assignment: "تعيين مسؤول الحالة",
    assigned_advocate: "المنسق المعين",
    secondary_worker: "أخصائي الرعاية المناوب",
    case_status: "حالة القضية",
    support_type: "نوع الدعم",
    household_size: "حجم الأسرة",
    change_password: "تغيير كلمة المرور",
    current_password: "كلمة المرور الحالية",
    new_password: "كلمة المرور الجديدة",
    confirm_new_password: "تأكيد كلمة المرور الجديدة",
    btn_update_password: "تحديث كلمة المرور",

    // Allocated Assistance
    assistance_title: "المساعدات المخصصة وسجلات المنح",
    assistance_subtitle: "المساعدات المالية والإغاثية المعتمدة من صندوق Zinthiya Trust.",
    filter_all: "الكل معتمد",
    filter_pending: "في انتظار الصرف",
    filter_distributed: "تم الصرف",
    alloc_amount: "مبلغ الدعم المخصص",
    alloc_date: "تاريخ التخصيص",
    alloc_purpose: "الغرض من الدعم",
    alloc_method: "طريقة الصرف",
    alloc_award_letter: "خطاب المنحة (PDF)",
    download_pdf: "جارٍ تنزيل إشعار التخصيص الرسمي PDF...",
    no_allocations_found: "لم يتم العثور على تخصيصات مطابقة.",

    // Support History
    history_title: "سجل الدعم وسجل الطلبات",
    history_subtitle: "تتبع طلبات الدعم السابقة والحالية وحالتها.",
    col_category: "فئة الخدمة / الحاجة",
    col_date: "تاريخ الطلب",
    col_urgency: "مستوى الأهمية",
    col_status: "الحالة",
    col_worker: "المسؤول المعين",
    col_notes: "ملاحظات الطلب",
    no_history_records: "لا توجد طلبات دعم مسجلة.",

    // Messages / Advocate
    translation_banner_title: "الكشف التلقائي عن اللغة والترجمة الفورية",
    translation_banner_sub: "اكتب بلغتك الأم. سيتم الكشف عن الرسائل وترجمتها تلقائيًا لمنسق حالتك.",
    translate_into: "ترجمة إلى:",
    auto_translate: "ترجمة تلقائية",
    btn_request_interpreter: "+ طلب مترجم فوري مباشر",
    interpreter_requested: "تم طلب مترجم فوري",
    threads_title: "المحادثات وسجلات القضية",
    active_thread_title: "المراسلة المباشرة ودعم القضية",
    direct_caseworker: "الأخصائي المباشر:",
    gdpr_encrypted: "تشفير UK GDPR 256 بت",
    encrypted_banner: "الرسائل في هذه المحادثة سرية ومشفرة بموجب قانون المؤسسات الخيرية في المملكة المتحدة.",
    no_messages_yet: "لا توجد رسائل حتى الآن",
    no_messages_sub: "أرسل رسالة نصية أو صوتية أدناه لبدء المحادثة مباشرة مع منسقك.",
    chat_placeholder: "اكتب رسالة سرية لأخصائي حالتك (أو اكتب بلغتك)...",
    btn_send: "إرسال",
    btn_voice_note: "رسالة صوتية",
    recording_text: "جارٍ تسجيل الصوت...",
    btn_stop_record: "إيقاف وإرفاق",
    btn_translate_msg: "ترجمة الرسالة",
    original_text: "النص الأصلي:",
    original_audio_transcript: "النص الصوتي الأصلي:",

    // Notifications
    notifications_title: "الإشعارات وتنبيهات الحالة",
    notifications_subtitle: "آخر التحديثات حول طلبات الدعم، والمنح، والرسائل.",
    btn_mark_all_read: "تحديد الكل كمقروء",
    no_notifications: "لا توجد إشعارات جديدة",

    // Language Settings
    lang_settings_title: "إعدادات اللغة وتفضيلات الترجمة",
    lang_settings_subtitle: "اختر لغتك المفضلة. يوفر صندوق Zinthiya Trust ترجمة معتمدة لجميع المراسلات والاجتماعات.",
    btn_save_language: "حفظ اختيار اللغة",
    toast_lang_saved: "تم تحديث تفضيلات اللغة بنجاح. تظهر الآن جميع محتويات البوابة باللغة التي اخترتها.",

    // Modals
    modal_request_title: "طلب دعم أو مساعدة طارئة",
    modal_request_sub: "يصل طلبك مباشرة إلى الأخصائي المعين لحالتك",
    form_category: "فئة المساعدة *",
    form_urgency: "مستوى الأهمية *",
    form_notes: "تفاصيل موجزة / ما تحتاجه عاجلاً *",
    form_notes_placeholder: "قدم تفاصيل موجزة عما تحتاجه بشكل عاجل...",
    btn_cancel: "إلغاء",
    btn_submit_request: "إرسال الطلب",
    submitting: "جارٍ الإرسال...",
    modal_logout_title: "تأكيد تسجيل الخروج",
    modal_logout_desc: "هل أنت متأكد من رغبتك في تسجيل الخروج من بوابة المستفيدين؟",
    kpi_distributed_sub: "إجمالي مساعدات الإغاثة المجتمعية المعتمدة والمصروفة.",
    kpi_allocated_sub: "المنح والمساعدات النشطة الحالية قيد التنفيذ.",
    advocate_details_title: "تفاصيل المستشار المعين",
    active_advocate_badge: "مستشار نشط",
    advocate_role_title: "مستشار أول لرعاية الأسرة والأزمات",
    available_today: "• متاح للاستشارات اليوم",
    direct_helpline_label: "خط المساعدة المباشر:",
    duty_email_label: "البريد الإلكتروني للخدمة:",
    duty_hours_text: "ساعات العمل: الإثنين – الجمعة، 9:00 ص – 4:30 م",
    btn_message_caseworker: "مراسلة الأخصائي الاجتماعي",
    btn_call_caseworker: "الاتصال بالأخصائي الاجتماعي",
    tab_recent_messages: "الرسائل الأخيرة",
    tab_notifications: "الإشعارات",
    view_all_arrow: "عرض الكل ←",
    duty_office_badge: "مكتب المناوبة",
    welcome_portal_message: "\"مرحبًا بك في بوابة عملاء The Zinthiya Trust. يمكنك مراجعة ملف قضيتك أو التحقق من المساعدات المخصصة أو طلب المساعدة الطارئة.\"",
    btn_open_advocate_thread: "فتح محادثة المستشار ←",
    no_active_notifications: "لا توجد إشعارات نشطة مسجلة.",
    filter_all_records: "جميع السجلات",
    filter_received: "المستلمة",
    filter_approved: "المعتمدة",
    filter_cancelled: "الملغاة",
    filter_completed: "المكتملة",
    tab_applied_requests: "الطلبات المقدمة",
    col_assistance_type: "نوع المساعدة",
    col_amount: "المبلغ",
    col_action: "الإجراء",
    is_typing: "يكتب الآن...",
    approved_by_trustees: "معتمد من مجلس الأمناء",
    download_award_summary: "تنزيل ملخص المنحة (PDF)",
    active_allocations_count: "تخصيصات نشطة",
    active_approved_grants: "المنح المعتمدة والنشطة",
    allocations_badge: "التخصيصات",
    trustee_verified_auth: "100% موثق ومعتمد من الأمناء",
    filter_disbursed_active: "مصروفة ونشطة",
    btn_grant_cards: "بطاقات المنح",
    btn_table_view: "عرض الجدول",
    search_assistance_placeholder: "البحث في الغرض، المنحة، المرجع...",
    alloc_details_governance: "تفاصيل المساعدة والإدارة",
    lbl_funding_partner: "شريك التمويل:",
    lbl_supervising_caseworker: "الأخصائي المشرف:",
    lbl_disbursement_method: "طريقة الصرف:",
    lbl_trustee_authority: "هيئة الاعتماد:",
    lbl_permitted_use: "الاستخدام المصرح به:",
    milestone_tracker_title: "الحالة الحالية ومتتبع المراحل",
    valid_through: "صالح حتى:",
    current_relief_period: "فترة الإغاثة الحالية",
    certified_care_charter: "معتمد بموجب ميثاق رعاية The Zinthiya Trust",
    btn_award_letter_pdf: "خطاب المنحة (PDF)",
    btn_view_full_details: "عرض التفاصيل الكاملة ←",
    view_details: "عرض التفاصيل",
    tbl_col_allocated_amount: "المبلغ المخصص",
    tbl_col_purpose_ref: "غرض التخصيص",
    tbl_col_alloc_date: "تاريخ التخصيص",
    tbl_col_current_status: "الحالة الحالية",
    tbl_col_details_action: "التفاصيل والإجراء",
    btn_close: "إغلاق",
    btn_print_notice: "طباعة إشعار التخصيص",
    advocate_dossier_title: "ملف المستشار المعين",
    btn_book_appointment: "حجز موعد",
    lbl_preferred_name: "الاسم المفضل / اللقب *",
    lbl_preferred_lang: "اللغة المفضلة للتحدث والكتابة",
    btn_save_personal_info: "حفظ المعلومات الشخصية",
    btn_save_contact_details: "حفظ تفاصيل الاتصال",
    "badge_support_archive": "أرشيف الدعم",
    "lbl_case_ref": "مرجع الحالة:",
    "kpi_support_received": "الدعم المستلم",
    "kpi_disbursed_received": "المنح المصروفة والمستلمة",
    "kpi_allocated_support": "الدعم المخصص",
    "kpi_pending_payout": "منح قيد الصرف",
    "kpi_total_tracked": "إجمالي المساعدات المسجلة",
    "kpi_records": "سجلات",
    "kpi_casework_ledger_active": "سجل قضايا الرعاية نشط",
    "status_received": "تم الاستلام",
    "status_approved": "معتمد",
    "th_assistance_type": "نوع المساعدة",
    "th_amount": "المبلغ",
    "th_status": "الحالة",
    "th_date": "التاريخ",
    "th_action": "الإجراء",
    "btn_view_details": "عرض التفاصيل",
    "lbl_submitted_by_client": "مقدم من قبل المستفيد",
    "lbl_allocated_prefix": "المخصص: ",
    "footer_certified_ledger": "سجل المساعدات الرسمي المعتمد لـ {name} • الجمعية الخيرية البريطانية رقم 1137350.",
    "milestones_title": "المراحل الرئيسية والجدول الزمني للحالة",
    "milestones_sub": "سجل تدريجي للاستشارات وتوزيع المنح والتقييمات المكتملة.",
    "step_intake_assigned": "استلام الحالة وتعيين المستشار",
    "step_account_active": "حساب المستفيد نشط وموثق",
    "step_intake_desc": "العميل مسجل في بوابة صندوق زينثيا. تم تعيين أخصائي رعاية مخصص.",
    "btn_download_ledger": "تنزيل سجل الدعم الرسمي",
    "modal_assistance_details": "تفاصيل المساعدة",
    "lbl_allocated_funds_title": "الأموال المخصصة من طلبات الدعم",
    "lbl_total_allocated_prefix": "إجمالي المخصص: ",
    "lbl_admin_feedback": "ملاحظات المراجعة الإدارية والتعليقات:",
    "btn_download_statement": "تنزيل الكشف",
    "lbl_credentials": "المؤهلات المهنية:",
    "lbl_badge_id": "معرف شارة المستشار:",
    "lbl_office_hours": "ساعات العمل:",
    "lbl_office_loc": "موقع المكتب الفعلي:",
    "lbl_casework_languages": "لغات تقديم الرعاية:",
    "lbl_advocate_bio": "نبذة عن المستشار",
    "urgency_high": "أولوية قصوى (احتياجات عاجلة خلال 24-48 ساعة)",
    "urgency_critical": "حالة طوارئ حرجة (أزمة فورية)",
    "urgency_medium": "دعم قياسي (خلال 3-5 أيام عمل قادمة)",
    "lbl_supporting_docs": "المستندات الداعمة",
    "lbl_attach_docs_hint": "أرفق الفواتير، الخطابات، الإشعارات، بطاقات الهوية",
    "btn_add_supporting_docs": "+ إضافة مستندات داعمة (يُسمح بتعدد المستندات)",
    "profile_personal_sub": "عرض السجلات الرسمية وتحديث تفاصيل الهوية المسموح بها.",
    "lbl_full_legal_name": "الاسم القانوني الكامل (السجل الرسمي)",
    "lbl_verified_record": "سجل موثق",
    "lbl_legal_name_hint": "لتحديث اسمك القانوني الرسمي، يلزم التحقق من الهوية من قبل المستشار.",
    "lbl_preferred_salutation": "الاسم المفضل / اللقب *",
    "lbl_preferred_name_hint": "كيف تفضل أن يخاطبك مستشارو الرعاية وفريق الدعم.",
    "lbl_case_reference_num": "الرقم المرجعي لقضية العميل",
    "lbl_dob_verified": "تاريخ الميلاد (موثق)",
    "lbl_pref_spoken_written": "اللغة المفضلة للتحدث والكتابة",
    "lbl_interpreter_session": "مترجم فوري معتمد للجلسات الحضورية",
    "opt_not_required": "غير مطلوب",
    "opt_require_interpreter": "مطلوب مترجم",
    "profile_contact_sub": "إدارة أرقام هواتفك، بريدك الإلكتروني، وجهات اتصال الطوارئ لتحديثات الحالة.",
    "lbl_primary_phone": "رقم الهاتف المحمول الأساسي *",
    "lbl_secondary_phone": "هاتف بديل / هاتف أرضي (اختياري)",
    "lbl_preferred_contact_method": "طريقة الاتصال المفضلة",
    "lbl_best_time_to_call": "أفضل وقت للاتصال",
    "lbl_emergency_name": "اسم أقرب الأقارب في حالات الطوارئ",
    "lbl_emergency_phone": "رقم الاتصال في حالات الطوارئ",
    "lbl_emergency_rel": "صلة القرابة بجهة اتصال الطوارئ",
    "profile_housing_sub": "تأكد من صحة عنوان سكنك لقسائم الخدمات والتسليم ومزايا البلدية.",
    "lbl_proof_verified": "تم التحقق من الإثبات",
    "lbl_address_line1": "العنوان السطر 1 (الشارع ورقم المنزل) *",
    "lbl_address_line2": "العنوان السطر 2 (شقة / طابق - اختياري)",
    "lbl_city": "البلدة / المدينة *",
    "lbl_postcode": "الرمز البريدي *",
    "lbl_housing_tenure": "ملكية السكن والوضع المعيشي",
    "btn_save_address": "حفظ معلومات العنوان",
    "profile_security_title": "الأمان وإدارة كلمة المرور",
    "profile_security_sub": "تأكد من حماية حسابك بكلمة مرور قوية وسرية.",
    "lbl_current_pw": "كلمة المرور الحالية *",
    "lbl_new_pw": "كلمة المرور الجديدة *",
    "lbl_confirm_new_pw": "تأكيد كلمة المرور الجديدة *",
    "gdpr_notice_title": "حماية بيانات UK GDPR والتغييرات المسموح بها",
    "gdpr_notice_desc": "يمكنك تحديث اسمك المفضل وأرقام هواتفك وعنوانك وكلمة المرور في أي وقت. يتطلب تغيير الاسم القانوني التحقق من الهوية.",
    "online_duty_caseworker": "متصل • أخصائي الرعاية المناوب",
    "typically_replies": "يرد عادةً خلال ساعتين أثناء ساعات العمل",
    "btn_call_advocate": "الاتصال بالمستشار",
    "btn_view_advocate_profile": "عرض الملف الكامل للمستشار",
    "advocate_spoken_langs": "اللغات التي يتحدث بها المستشار:",
    "btn_stop_send_voice": "إيقاف وإرسال رسالة صوتية",
    "lbl_playing_audio": "جارٍ تشغيل الصوت...",
    "lbl_voice_message": "رسالة صوتية",
    "lbl_show_orig_transcript": "عرض النص الصوتي الأصلي",
    "lbl_translate_transcript": "ترجمة النص الصوتي",
    "lbl_translating": "جارٍ الترجمة...",
    "lbl_recording_voice": "جارٍ تسجيل ملاحظة صوتية...",
    "urgent_emergency_title": "حالة رعاية طارئة وعاجلة؟",
    "urgent_emergency_desc": "إذا انقطعت إمدادات الطاقة أو احتجت لمأوى طارئ، اتصل بمكتب الرعاية على 0116 254 5168.",
    "msg_pw_changed_success": "تم تغيير كلمة المرور بنجاح.",
    "btn_save": "حفظ",
    "lbl_show_original": "إظهار الرسالة الأصلية",
    "lbl_show_orig_en": "إظهار الأصل (الإنجليزية)",
    "btn_translate_into": "ترجمة إلى",
    "lbl_note_relocating": "ملاحظة بخصوص الانتقال:",
    "desc_note_relocating": "إذا انتقلت إلى سكن جديد، فإن تحديث عنوانك يضمن إرسال المساعدات إلى منزلك الحالي.",
    "lbl_app_stage": "مرحلة الطلب",
    "lbl_award_amount": "مبلغ المنحة",
    "lbl_reference_id": "المعرف المرجعي",
    "lbl_submitted_for_approval": "ما قدمته للموافقة الإدارية:",
    "lbl_assistance_notes": "نطاق المساعدة والملاحظات:",
    "lbl_supporting_docs_approval": "المستندات الداعمة المقدمة للاعتماد",
    "btn_view_file": "عرض الملف",
    "lbl_linked_allocations": "مخصصات المساعدة المرتبطة",
    "lbl_total_colon": "الإجمالي:",
    "lbl_intake_case_ref": "تم تسجيل الحالة تحت الرقم المرجعي:",
    "badge_recorded": "مسجل",
  },

  bn: {
    lbl_effective_date: "কার্যকরী:",
    lbl_email_address: "নিবন্ধিত ইমেল ঠিকানা *",
    modal_allocation_cert_notice: "এই সহায়তা প্যাকেজটি সুবিধাভোগীর জন্য দ্য জিনথিয়া ট্রাস্ট দ্বারা আনুষ্ঠানিকভাবে পর্যালোচনা এবং অনুমোদিত হয়েছে",
    effective_date_label: "কার্যকরী / অর্থপ্রদানের তারিখ",
    funding_auth_label: "তহবিল অংশীদার এবং অনুমোদন",
    permitted_terms_label: "অনুমোদিত ব্যবহার ও শর্তাবলী",
    conversations_sub: "সক্রিয় কেসওয়ার্ক আলোচনা এবং পূর্ববর্তী সমাধান করা সহায়তা রেকর্ডের মধ্যে স্যুইচ করুন।",
    advocate_info_btn: "পরামর্শদাতার বিবরণ ও সরাসরি লাইন →",
    no_notifications_sub: "কোনো সক্রিয় সতর্কতা নেই। আপনার জরুরি অনুদান, আবেদন এবং কেসওয়ার্কারের বার্তার যাচাইকৃত আপডেট এখানে রিয়েল-টাইমে প্রদর্শিত হবে।",

    // Nav
    portal_badge: "উপকারভোগী পোর্টাল",
    nav_dashboard: "ড্যাশবোর্ড",
    nav_profile: "আমার প্রোফাইল",
    nav_assistance: "বরাদ্দকৃত সহায়তা",
    nav_history: "সহায়তার ইতিহাস",
    nav_messages: "বার্তা / পরামর্শদাতা",
    nav_notifications: "বিজ্ঞপ্তি",
    nav_language: "ভাষা সেটিংস",
    nav_logout: "লগ আউট",
    helpline_title: "কেসওয়ার্ক হেল্পলাইন",
    helpline_hours: "সোম - শুক্র, সকাল ৯:০০ - বিকাল ৪:৩০",

    // Header
    client_care_portal: "ক্লায়েন্ট কেয়ার পোর্টাল",
    caseworker_prefix: "কেসওয়ার্কার:",
    crisis_advocate_badge: "নিবেদিত সংকট পরামর্শদাতা",
    btn_request_support: "+ সহায়তার অনুরোধ করুন",
    btn_logout: "লগ আউট",

    // Dashboard
    welcome_back: "স্বাগতম",
    active_beneficiary: "সক্রিয় উপকারভোগী",
    case_ref: "কেস রেফারেন্স:",
    gdpr_verified: "UK GDPR যাচাইকৃত অ্যাকাউন্ট",
    display_currency: "মুদ্রা প্রদর্শন:",
    registered_contact: "নিবন্ধিত যোগাযোগ",
    registered_home_address: "নিবন্ধিত ঠিকানা",
    dedicated_worker: "সংকট কর্মী",
    case_support_status: "সহায়তার অবস্থা",
    active_support: "সক্রিয় সহায়তা",
    stat_total_allocated: "মোট বরাদ্দকৃত সহায়তা",
    stat_distributed: "বিতরণ করা হয়েছে",
    stat_pending_payout: "বকেয়া সহায়তা",
    stat_pending_requests: "অপেক্ষমান আবেদন",
    stat_caseworker: "নিবেদিত কেসওয়ার্কার",
    stat_unread_messages: "অপঠিত বার্তা",
    quick_actions: "দ্রুত পদক্ষেপ",
    qa_send_message: "কেসওয়ার্কারকে বার্তা পাঠান",
    qa_view_grants: "অনুদান ও বরাদ্দ দেখুন",
    qa_emergency_line: "জরুরি হেল্পলাইন",
    recent_activity: "সাম্প্রতিক কার্যকলাপ ও সতর্কতা",
    no_recent_activity: "কোনো সাম্প্রতিক কার্যকলাপ রেকর্ড করা নেই।",
    active_allocations_title: "সক্রিয় বরাদ্দ",
    no_active_allocations: "কোনো সক্রিয় বরাদ্দ পাওয়া যায়নি।",
    view_all: "সব দেখুন",

    // Profile
    profile_title: "ক্লায়েন্ট প্রোফাইল ও নথি",
    profile_subtitle: "আপনার যাচাইকৃত নিবন্ধনের বিবরণ এবং জরুরি যোগাযোগের তথ্য।",
    personal_details: "ব্যক্তিগত বিবরণ",
    full_name: "পুরো নাম",
    client_ref: "রেফারেন্স নম্বর",
    dob: "জন্ম তারিখ",
    gender: "লিঙ্গ",
    primary_language: "প্রধান ভাষা",
    contact_details: "যোগাযোগের বিবরণ",
    email_address: "ইমেল ঠিকানা",
    phone_number: "ফোন নম্বর",
    residential_address: "আবাসিক ঠিকানা",
    council_area: "কাউন্সিল এলাকা",
    emergency_contact: "জরুরি যোগাযোগ",
    next_of_kin: "নিকটাত্মীয়ের নাম",
    emergency_phone: "জরুরি ফোন নম্বর",
    casework_assignment: "কেসওয়ার্ক বরাদ্দ",
    assigned_advocate: "নিযুক্ত পরামর্শদাতা",
    secondary_worker: "কল্যাণ কর্মকর্তা",
    case_status: "কেসের অবস্থা",
    support_type: "সহায়তার ধরন",
    household_size: "পরিবারের সদস্য সংখ্যা",
    change_password: "পাসওয়ার্ড পরিবর্তন করুন",
    current_password: "বর্তমান পাসওয়ার্ড",
    new_password: "নতুন পাসওয়ার্ড",
    confirm_new_password: "নতুন পাসওয়ার্ড নিশ্চিত করুন",
    btn_update_password: "পাসওয়ার্ড আপডেট করুন",

    // Allocated Assistance
    assistance_title: "বরাদ্দকৃত সহায়তা ও অনুদানের রেকর্ড",
    assistance_subtitle: "জিন্থিয়া ট্রাস্ট কর্তৃক অনুমোদিত আর্থিক ও জরুরি সহায়তা।",
    filter_all: "সকল অনুমোদিত",
    filter_pending: "বকেয়া অর্থপ্রদান",
    filter_distributed: "বিতরণ করা হয়েছে",
    alloc_amount: "সহায়তার পরিমাণ",
    alloc_date: "বরাদ্দের তারিখ",
    alloc_purpose: "বরাদ্দের উদ্দেশ্য",
    alloc_method: "অর্থপ্রদানের পদ্ধতি",
    alloc_award_letter: "অনুমোদন পত্র (PDF)",
    download_pdf: "অফিসিয়াল বরাদ্দ নোটিশ PDF ডাউনলোড হচ্ছে...",
    no_allocations_found: "কোনো বরাদ্দ পাওয়া যায়নি।",

    // Support History
    history_title: "সহায়তার ইতিহাস ও আবেদন লগ",
    history_subtitle: "আপনার পূর্ববর্তী এবং সক্রিয় আবেদনগুলি ট্র্যাক করুন।",
    col_category: "সেবা / চাহিদার বিভাগ",
    col_date: "আবেদনের তারিখ",
    col_urgency: "জরুরিতার মাত্রা",
    col_status: "অবস্থা",
    col_worker: "নিযুক্ত কর্মী",
    col_notes: "আবেদনের বিবরণ",
    no_history_records: "কোনো আবেদন রেকর্ড নেই।",

    // Messages / Advocate
    translation_banner_title: "স্বয়ংক্রিয় ভাষা শনাক্তকরণ এবং রিয়েল-টাইম অনুবাদ",
    translation_banner_sub: "আপনার মাতৃভাষায় লিখুন। বার্তাগুলি আপনার পরামর্শদাতার জন্য স্বয়ংক্রিয়ভাবে অনুবাদ করা হয়।",
    translate_into: "অনুবাদ করুন:",
    auto_translate: "স্বয়ংক্রিয় অনুবাদ",
    btn_request_interpreter: "+ লাইভ অনুবাদকের অনুরোধ করুন",
    interpreter_requested: "অনুবাদক অনুরোধ করা হয়েছে",
    threads_title: "কথোপকথন ও কেস থ্রেড",
    active_thread_title: "সরাসরি বার্তা ও কেসওয়ার্ক",
    direct_caseworker: "সরাসরি কেসওয়ার্কার:",
    gdpr_encrypted: "UK GDPR ২৫৬-বিট এনক্রিপ্ট করা",
    encrypted_banner: "এই থ্রেডের বার্তাগুলি যুক্তরাজ্যের দাতব্য আইনের অধীনে গোপনীয়।",
    no_messages_yet: "এখনও কোনো বার্তা নেই",
    no_messages_sub: "সরাসরি কথা বলতে নিচে একটি বার্তা বা ভয়েস নোট পাঠান।",
    chat_placeholder: "আপনার কেসওয়ার্কারকে বার্তা লিখুন...",
    btn_send: "পাঠান",
    btn_voice_note: "ভয়েস নোট",
    recording_text: "ভয়েস রেকর্ড হচ্ছে...",
    btn_stop_record: "থামুন ও যুক্ত করুন",
    btn_translate_msg: "বার্তা অনুবাদ করুন",
    original_text: "মূল পাঠ্য:",
    original_audio_transcript: "মূল অডিও ট্রান্সক্রিপ্ট:",

    // Notifications
    notifications_title: "বিজ্ঞপ্তি ও সতর্কতা",
    notifications_subtitle: "আপনার আবেদন এবং বার্তাগুলির সাম্প্রতিক আপডেট।",
    btn_mark_all_read: "সব পঠিত হিসেবে চিহ্নিত করুন",
    no_notifications: "কোনো নতুন বিজ্ঞপ্তি নেই",

    // Language Settings
    lang_settings_title: "ভাষা সেটিংস ও অনুবাদক পছন্দ",
    lang_settings_subtitle: "আপনার পছন্দের ভাষা নির্বাচন করুন। জিন্থিয়া ট্রাস্ট সমস্ত যোগাযোগ এবং মিটিংয়ের জন্য অনুমোদিত অনুবাদ সরবরাহ করে।",
    btn_save_language: "ভাষা নির্বাচন সংরক্ষণ করুন",
    toast_lang_saved: "ভাষার পছন্দ সফলভাবে আপডেট করা হয়েছে। পুরো পোর্টাল এখন আপনার নির্বাচিত ভাষায় প্রদর্শিত হচ্ছে।",

    // Modals
    modal_request_title: "সহায়তা বা জরুরি সাহায্যের অনুরোধ",
    modal_request_sub: "আপনার অনুরোধ সরাসরি নিযুক্ত কেসওয়ার্কারের কাছে পৌঁছাবে",
    form_category: "সহায়তার বিভাগ *",
    form_urgency: "জরুরিতার মাত্রা *",
    form_notes: "সংক্ষিপ্ত বিবরণ / আপনার যা প্রয়োজন *",
    form_notes_placeholder: "আপনার কী প্রয়োজন তা সংক্ষেপে বর্ণনা করুন...",
    btn_cancel: "বাতিল করুন",
    btn_submit_request: "অনুরোধ জমা দিন",
    submitting: "জমা দেওয়া হচ্ছে...",
    modal_logout_title: "লগ আউট নিশ্চিত করুন",
    modal_logout_desc: "আপনি কি নিশ্চিতভাবে পোর্টাল থেকে লগ আউট করতে চান?",
    kpi_distributed_sub: "মোট অনুমোদিত ও বিতরণকৃত সম্প্রদায় ত্রাণ সহায়তা।",
    kpi_allocated_sub: "বর্তমান সক্রিয় অনুদান ও প্রক্রিয়াধীন সহায়তা।",
    advocate_details_title: "নিযুক্ত পরামর্শদাতার বিবরণ",
    active_advocate_badge: "সক্রিয় পরামর্শদাতা",
    advocate_role_title: "সিনিয়র পরিবার কল্যাণ ও সংকট পরামর্শদাতা",
    available_today: "• আজ পরামর্শের জন্য উপলব্ধ",
    direct_helpline_label: "সরাসরি হেল্পলাইন:",
    duty_email_label: "ডিউটি ইমেইল:",
    duty_hours_text: "ডিউটির সময়: সোম – শুক্র, সকাল ৯:০০ – বিকাল ৪:৩০",
    btn_message_caseworker: "কেসওয়ার্কারকে বার্তা পাঠান",
    btn_call_caseworker: "কেসওয়ার্কারকে কল করুন",
    tab_recent_messages: "সাম্প্রতিক বার্তা",
    tab_notifications: "বিজ্ঞপ্তি",
    view_all_arrow: "সব দেখুন →",
    duty_office_badge: "ডিউটি অফিস",
    welcome_portal_message: "\"জিনথিয়া ট্রাস্ট ক্লায়েন্ট পোর্টালে আপনাকে স্বাগতম। আপনি আপনার কেস ফাইল পর্যালোচনা করতে পারেন, বরাদ্দকৃত সাহায্য পরীক্ষা করতে পারেন বা জরুরি সহায়তার অনুরোধ করতে পারেন।\"",
    btn_open_advocate_thread: "পরামর্শদাতার সাথে বার্তা থ্রেড খুলুন →",
    no_active_notifications: "কোনো সক্রিয় বিজ্ঞপ্তি নথিভুক্ত নেই।",
    filter_all_records: "সমস্ত রেকর্ড",
    filter_received: "প্রাপ্ত",
    filter_approved: "অনুমোদিত",
    filter_cancelled: "বাতিল",
    filter_completed: "সম্পন্ন",
    tab_applied_requests: "আবেদিত অনুরোধ",
    col_assistance_type: "সহায়তার ধরন",
    col_amount: "পরিমাণ",
    col_action: "পদক্ষেপ",
    is_typing: "টাইপ করছেন...",
    approved_by_trustees: "ট্রাস্টিদের দ্বারা অনুমোদিত",
    download_award_summary: "পুরস্কার সারসংক্ষেপ ডাউনলোড করুন (PDF)",
    active_allocations_count: "সক্রিয় বরাদ্দ",
    active_approved_grants: "সক্রিয় অনুমোদিত অনুদান",
    allocations_badge: "বরাদ্দসমূহ",
    trustee_verified_auth: "১০০% ট্রাস্টি দ্বারা যাচাইকৃত ও অনুমোদিত",
    filter_disbursed_active: "বিতরণকৃত ও সক্রিয়",
    btn_grant_cards: "অনুদান কার্ড",
    btn_table_view: "টেবিল ভিউ",
    search_assistance_placeholder: "উদ্দেশ্য, অনুদান, রেফারেন্স খুঁজুন...",
    alloc_details_governance: "সহায়তার বিবরণ ও পরিচালনা",
    lbl_funding_partner: "অর্থায়ন অংশীদার:",
    lbl_supervising_caseworker: "তত্ত্বাবধায়ক কেসওয়ার্কার:",
    lbl_disbursement_method: "বিতরণ পদ্ধতি:",
    lbl_trustee_authority: "ট্রাস্টি কর্তৃপক্ষ:",
    lbl_permitted_use: "অনুমোদিত ব্যবহার:",
    milestone_tracker_title: "বর্তমান স্থিতি ও অগ্রগতি ট্র্যাকার",
    valid_through: "মেয়াদ শেষ:",
    current_relief_period: "বর্তমান ত্রাণ সময়কাল",
    certified_care_charter: "জিনথিয়া ট্রাস্ট কেয়ার সনদের অধীনে প্রত্যয়িত",
    btn_award_letter_pdf: "পুরস্কার পত্র (PDF)",
    btn_view_full_details: "সম্পূর্ণ বিবরণ দেখুন →",
    view_details: "বিবরণ দেখুন",
    tbl_col_allocated_amount: "বরাদ্দকৃত পরিমাণ",
    tbl_col_purpose_ref: "বরাদ্দের উদ্দেশ্য",
    tbl_col_alloc_date: "বরাদ্দের তারিখ",
    tbl_col_current_status: "বর্তমান স্থিতি",
    tbl_col_details_action: "বিবরণ ও পদক্ষেপ",
    btn_close: "বন্ধ করুন",
    btn_print_notice: "বরাদ্দ নোটিশ প্রিন্ট করুন",
    advocate_dossier_title: "নিযুক্ত পরামর্শদাতার নথি",
    btn_book_appointment: "সাক্ষাৎকার নির্ধারণ করুন",
    lbl_preferred_name: "পছন্দের নাম / সম্বোধন *",
    lbl_preferred_lang: "পছন্দের কথ্য ও লিখিত ভাষা",
    btn_save_personal_info: "ব্যক্তিগত তথ্য সংরক্ষণ করুন",
    btn_save_contact_details: "যোগাযোগের বিবরণ সংরক্ষণ করুন",
    "badge_support_archive": "সহায়তা সংরক্ষণাগার",
    "lbl_case_ref": "কেস রেফারেন্স:",
    "kpi_support_received": "প্রাপ্ত সহায়তা",
    "kpi_disbursed_received": "বিতরণ ও প্রাপ্ত অনুদান",
    "kpi_allocated_support": "বরাদ্দকৃত সহায়তা",
    "kpi_pending_payout": "পরিশোধ মুলতুবি থাকা অনুদান",
    "kpi_total_tracked": "মোট ট্র্যাক করা সহায়তা",
    "kpi_records": "রেকর্ড",
    "kpi_casework_ledger_active": "অফিসিয়াল কেসওয়ার্ক লেজার সক্রিয়",
    "status_received": "প্রাপ্ত",
    "status_approved": "অনুমোদিত",
    "th_assistance_type": "সহায়তার ধরন",
    "th_amount": "পরিমাণ",
    "th_status": "অবস্থা",
    "th_date": "তারিখ",
    "th_action": "পদক্ষেপ",
    "btn_view_details": "বিস্তারিত দেখুন",
    "lbl_submitted_by_client": "ক্লায়েন্ট দ্বারা জমা দেওয়া",
    "lbl_allocated_prefix": "বরাদ্দকৃত: ",
    "footer_certified_ledger": "{name}-এর জন্য প্রত্যয়িত অফিসিয়াল সহায়তা লেজার • UK Charity No. 1137350।",
    "milestones_title": "কেসওয়ার্কের মাইলফলক ও সময়রেখা",
    "milestones_sub": "পরামর্শ, অনুদান বিতরণ এবং সম্পন্ন মূল্যায়নের ধাপে ধাপে ইতিহাস।",
    "step_intake_assigned": "কেস গ্রহণ এবং পরামর্শক নিয়োগ",
    "step_account_active": "উপকারভোগীর অ্যাকাউন্ট সক্রিয় এবং যাচাইকৃত",
    "step_intake_desc": "জিনথিয়া ট্রাস্ট পোর্টালে ক্লায়েন্ট নিবন্ধিত। নিবেদিত কেসওয়ার্কার নিযুক্ত।",
    "btn_download_ledger": "অফিসিয়াল সহায়তা লেজার ডাউনলোড করুন",
    "modal_assistance_details": "সহায়তার বিবরণ",
    "lbl_allocated_funds_title": "সহায়তার অনুরোধ থেকে বরাদ্দকৃত তহবিল",
    "lbl_total_allocated_prefix": "মোট বরাদ্দ: ",
    "lbl_admin_feedback": "অ্যাডমিন পর্যালোচনা নোট এবং প্রতিক্রিয়া:",
    "btn_download_statement": "বিবৃতি ডাউনলোড করুন",
    "lbl_credentials": "পেশাদার প্রশংসাপত্র:",
    "lbl_badge_id": "পরামর্শক ব্যাজ আইডি:",
    "lbl_office_hours": "অফিসের সময়:",
    "lbl_office_loc": "অফিসের অবস্থান:",
    "lbl_casework_languages": "কেসওয়ার্কের ভাষা:",
    "lbl_advocate_bio": "পরামর্শকের পটভূমি",
    "urgency_high": "উচ্চ অগ্রাধিকার (২৪-৪৮ ঘণ্টার মধ্যে জরুরি প্রয়োজন)",
    "urgency_critical": "সংকটজনক জরুরি অবস্থা (তাৎক্ষণিক সংকট)",
    "urgency_medium": "সাধারণ সহায়তা (পরবর্তী ৩-৫ কার্যদিবস)",
    "lbl_supporting_docs": "সহায়ক নথিপত্র",
    "lbl_attach_docs_hint": "বিল, চিঠি, নোটিশ, পরিচয়পত্র সংযুক্ত করুন",
    "btn_add_supporting_docs": "+ সহায়ক নথি যোগ করুন (একাধিক অনুমোদিত)",
    "profile_personal_sub": "অফিসিয়াল রেকর্ড দেখুন এবং অনুমোদিত পরিচয় বিবরণ আপডেট করুন।",
    "lbl_full_legal_name": "পূর্ণ আইনি নাম (অফিসিয়াল রেকর্ড)",
    "lbl_verified_record": "যাচাইকৃত রেকর্ড",
    "lbl_legal_name_hint": "আপনার অফিসিয়াল আইনি নাম আপডেট করতে কেসওয়ার্কারের পরিচয় যাচাই প্রয়োজন।",
    "lbl_preferred_salutation": "পছন্দের নাম / সম্বোধন *",
    "lbl_preferred_name_hint": "পরামর্শক এবং কর্মীরা আপনাকে যেভাবে সম্বোধন করবেন।",
    "lbl_case_reference_num": "ক্লায়েন্ট কেস রেফারেন্স নম্বর",
    "lbl_dob_verified": "জন্ম তারিখ (যাচাইকৃত)",
    "lbl_pref_spoken_written": "পছন্দের কথ্য ও লিখিত ভাষা",
    "lbl_interpreter_session": "সরাসরি সেশনের জন্য স্বীকৃত দোভাষী",
    "opt_not_required": "প্রয়োজন নেই",
    "opt_require_interpreter": "দোভাষী প্রয়োজন",
    "profile_contact_sub": "কেস আপডেটের জন্য আপনার ফোন নম্বর, ইমেল এবং জরুরি যোগাযোগের বিবরণ পরিচালনা করুন।",
    "lbl_primary_phone": "প্রাথমিক মোবাইল ফোন নম্বর *",
    "lbl_secondary_phone": "বিকল্প / বাড়ির ল্যান্ডলাইন (ঐচ্ছিক)",
    "lbl_preferred_contact_method": "পছন্দের যোগাযোগের মাধ্যম",
    "lbl_best_time_to_call": "কল করার সেরা সময়",
    "lbl_emergency_name": "জরুরি নিকটাত্মীয়ের নাম",
    "lbl_emergency_phone": "জরুরি যোগাযোগের নম্বর",
    "lbl_emergency_rel": "জরুরি যোগাযোগের সাথে সম্পর্ক",
    "profile_housing_sub": "ভাউচার, ডেলিভারি এবং সুবিধার জন্য আপনার ঠিকানা সঠিক রাখুন।",
    "lbl_proof_verified": "প্রমাণ যাচাইকৃত",
    "lbl_address_line1": "ঠিকানা লাইন ১ (রাস্তা এবং বাড়ি নম্বর) *",
    "lbl_address_line2": "ঠিকানা লাইন ২ (ফ্ল্যাট / অ্যাপার্টমেন্ট - ঐচ্ছিক)",
    "lbl_city": "শহর / নগরী *",
    "lbl_postcode": "পোস্টকোড *",
    "lbl_housing_tenure": "আবাসনের মেয়াদ এবং জীবনযাত্রার পরিস্থিতি",
    "btn_save_address": "ঠিকানার তথ্য সংরক্ষণ করুন",
    "profile_security_title": "নিরাপত্তা ও পাসওয়ার্ড ব্যবস্থাপনা",
    "profile_security_sub": "আপনার অ্যাকাউন্ট একটি শক্তিশালী, গোপনীয় পাসওয়ার্ড দিয়ে সুরক্ষিত রাখুন।",
    "lbl_current_pw": "বর্তমান পাসওয়ার্ড *",
    "lbl_new_pw": "নতুন পাসওয়ার্ড *",
    "lbl_confirm_new_pw": "নতুন পাসওয়ার্ড নিশ্চিত করুন *",
    "gdpr_notice_title": "UK GDPR ডেটা সুরক্ষা এবং অনুমোদিত পরিবর্তন",
    "gdpr_notice_desc": "আপনি যেকোনো সময় আপনার পছন্দের নাম, ফোন নম্বর, ঠিকানা এবং পাসওয়ার্ড আপডেট করতে পারেন।",
    "online_duty_caseworker": "অনলাইন • দায়িত্বপ্রাপ্ত কেসওয়ার্কার",
    "typically_replies": "দায়িত্বের সময় সাধারণত ২ ঘণ্টার মধ্যে উত্তর দেয়",
    "btn_call_advocate": "পরামর্শককে কল করুন",
    "btn_view_advocate_profile": "সম্পূর্ণ পরামর্শক প্রোফাইল দেখুন",
    "advocate_spoken_langs": "পরামর্শকের কথ্য ভাষা:",
    "btn_stop_send_voice": "থামুন এবং ভয়েস নোট পাঠান",
    "lbl_playing_audio": "অডিও বাজছে...",
    "lbl_voice_message": "ভয়েস বার্তা",
    "lbl_show_orig_transcript": "মূল অডিও প্রতিলিপি দেখান",
    "lbl_translate_transcript": "অডিও প্রতিলিপি অনুবাদ করুন",
    "lbl_translating": "অনুবাদ হচ্ছে...",
    "lbl_recording_voice": "ভয়েস নোট রেকর্ড হচ্ছে...",
    "urgent_emergency_title": "জরুরি কেসওয়ার্ক?",
    "urgent_emergency_desc": "যদি গ্যাস বা বিদ্যুৎ সংযোগ বিচ্ছিন্ন হয় বা জরুরি আশ্রয়ের প্রয়োজন হয়, তবে 0116 254 5168 নম্বরে কল করুন।",
    "msg_pw_changed_success": "আপনার পাসওয়ার্ড সফলভাবে পরিবর্তিত হয়েছে।",
    "btn_save": "সংরক্ষণ",
    "lbl_show_original": "মূল বার্তা দেখান",
    "lbl_show_orig_en": "মূল দেখান (ইংরেজি)",
    "btn_translate_into": "অনুবাদ করুন",
    "lbl_note_relocating": "স্থানান্তরের জন্য দ্রষ্টব্য:",
    "desc_note_relocating": "নতুন ঠিকানায় গেলে আপনার ঠিকানা আপডেট করুন যাতে সহায়তা বর্তমান ঠিকানায় পৌঁছায়।",
    "lbl_app_stage": "আবেদনের পর্যায়",
    "lbl_award_amount": "অনুদানের পরিমাণ",
    "lbl_reference_id": "রেফারেন্স আইডি",
    "lbl_submitted_for_approval": "অ্যাডমিন অনুমোদনের জন্য জমা দেওয়া:",
    "lbl_assistance_notes": "সহায়তার সুযোগ এবং নোট:",
    "lbl_supporting_docs_approval": "অনুমোদনের জন্য প্রদত্ত সহায়ক নথি",
    "btn_view_file": "ফাইল দেখুন",
    "lbl_linked_allocations": "সংযুক্ত সহায়তা বরাদ্দ",
    "lbl_total_colon": "মোট:",
    "lbl_intake_case_ref": "কেস রেফারেন্সের অধীনে নিবন্ধিত ইনটেক:",
    "badge_recorded": "রেকর্ড করা",
  },

  ml: {
    lbl_effective_date: "പ്രാബല്യത്തിൽ:",
    lbl_email_address: "രജിസ്റ്റർ ചെയ്ത ഇമെയിൽ വിലാസം *",
    modal_allocation_cert_notice: "ഈ സഹായ പാക്കേജ് ഗുണഭോക്താവിനായി ദി സിന്ധിയ ട്രസ്റ്റ് ഔദ്യോഗികമായി പരിശോധിച്ച് അംഗീകരിച്ചതാണ്",
    effective_date_label: "പ്രാബല്യത്തിൽ വരുന്ന / വിതരണ തീയതി",
    funding_auth_label: "ഫണ്ടിംഗ് പങ്കാളിയും അംഗീകാരവും",
    permitted_terms_label: "അനുവദനീയമായ ഉപയോഗവും നിബന്ധനകളും",
    conversations_sub: "സജീവമായ കേസ് വർക്ക് ചർച്ചകൾക്കും മുൻകാല സഹായ രേഖകൾക്കും ഇടയിൽ മാറുക.",
    advocate_info_btn: "ഉപദേശക വിവരങ്ങളും നേരിട്ടുള്ള ഹെൽപ്പ് ലൈനും →",
    no_notifications_sub: "സജീവ മുന്നറിയിപ്പുകളൊന്നുമില്ല. നിങ്ങളുടെ അടിയന്തര ഗ്രാന്റുകൾ, അപേക്ഷകൾ, കേസ് വർക്കർ സന്ദേശങ്ങൾ എന്നിവയെക്കുറിച്ചുള്ള അപ്‌ഡേറ്റുകൾ ഇവിടെ തത്സമയം ദൃശ്യമാകും.",

    // Nav
    portal_badge: "ഗുണഭോക്തൃ പോർട്ടൽ",
    nav_dashboard: "ഡാഷ്‌ബോർഡ്",
    nav_profile: "എന്റെ പ്രൊഫൈൽ",
    nav_assistance: "അനുവദിച്ച സഹായം",
    nav_history: "സഹായ ചരിത്രം",
    nav_messages: "സന്ദേശങ്ങൾ / ഉപദേശകൻ",
    nav_notifications: "അറിയിപ്പുകൾ",
    nav_language: "ഭാഷ ക്രമീകരണങ്ങൾ",
    nav_logout: "ലോഗ് ഔട്ട്",
    helpline_title: "കേസ്‌വർക്ക് ഹെൽപ്പ്‌ലൈൻ",
    helpline_hours: "തിങ്കൾ - വെള്ളി, രാവിലെ 9:00 - വൈകുന്നേരം 4:30",

    // Header
    client_care_portal: "ക്ലയന്റ് കെയർ പോർട്ടൽ",
    caseworker_prefix: "കേസ്‌വർക്കർ:",
    crisis_advocate_badge: "പ്രത്യേക പ്രതിസന്ധി ഉപദേശകൻ",
    btn_request_support: "+ സഹായം അഭ്യർത്ഥിക്കുക",
    btn_logout: "ലോഗ് ഔട്ട്",

    // Dashboard
    welcome_back: "വീണ്ടും സ്വാഗതം",
    active_beneficiary: "സജീവ ഗുണഭോക്താവ്",
    case_ref: "കേസ് റഫറൻസ്:",
    gdpr_verified: "UK GDPR പരിശോധിച്ചുറപ്പിച്ച അക്കൗണ്ട്",
    display_currency: "നാണയം കാണിക്കുക:",
    registered_contact: "രജിസ്റ്റർ ചെയ്ത ഫോൺ",
    registered_home_address: "രജിസ്റ്റർ ചെയ്ത വിലാസം",
    dedicated_worker: "പ്രത്യേക പ്രതിസന്ധി പ്രവർത്തകൻ",
    case_support_status: "സഹായ സ്ഥിതി",
    active_support: "സജീവ സഹായം",
    stat_total_allocated: "ആകെ അനുവദിച്ച സഹായം",
    stat_distributed: "ഇതുവരെ നൽകിയത്",
    stat_pending_payout: "നൽകാനുള്ള ബാക്കി തുക",
    stat_pending_requests: "തീർപ്പുകൽപ്പിക്കാത്ത അപേക്ഷകൾ",
    stat_caseworker: "പ്രത്യേക കേസ്‌വർക്കർ",
    stat_unread_messages: "വായിക്കാത്ത സന്ദേശങ്ങൾ",
    quick_actions: "പെട്ടെന്നുള്ള പ്രവർത്തനങ്ങൾ",
    qa_send_message: "കേസ്‌വർക്കർക്ക് സന്ദേശം അയക്കുക",
    qa_view_grants: "ഗ്രാന്റുകളും വിഹിതവും കാണുക",
    qa_emergency_line: "അടിയന്തര സഹായ ലൈൻ",
    recent_activity: "സമീപകാല പ്രവർത്തനങ്ങളും മുന്നറിയിപ്പുകളും",
    no_recent_activity: "സമീപകാല പ്രവർത്തനങ്ങളൊന്നും രേഖപ്പെടുത്തിയിട്ടില്ല.",
    active_allocations_title: "സജീവ വിഹിതം",
    no_active_allocations: "സജീവ വിഹിതമൊന്നും കണ്ടെത്തിയില്ല.",
    view_all: "എല്ലാം കാണുക",

    // Profile
    profile_title: "ക്ലയന്റ് പ്രൊഫൈലും രേഖകളും",
    profile_subtitle: "നിങ്ങളുടെ പരിശോധിച്ചുറപ്പിച്ച വിവരങ്ങൾ, നിയോഗിച്ച ഉപദേശകൻ, അടിയന്തര കോൺടാക്റ്റുകൾ.",
    personal_details: "വ്യക്തിഗത വിവരങ്ങൾ",
    full_name: "പൂർണ്ണ നാമം",
    client_ref: "ക്ലയന്റ് റഫറൻസ് നമ്പർ",
    dob: "ജനനത്തീയതി",
    gender: "ലിംഗഭേദം",
    primary_language: "പ്രധാന ഭാഷ",
    contact_details: "ബന്ധപ്പെടാനുള്ള വിവരങ്ങൾ",
    email_address: "ഇമെയിൽ വിലാസം",
    phone_number: "ഫോൺ നമ്പർ",
    residential_address: "താമസ വിലാസം",
    council_area: "കൗൺസിൽ പ്രദേശം",
    emergency_contact: "അടിയന്തര ബന്ധം",
    next_of_kin: "അടുത്ത ബന്ധു",
    emergency_phone: "അടിയന്തര ഫോൺ നമ്പർ",
    casework_assignment: "കേസ്‌വർക്ക് നിയോഗം",
    assigned_advocate: "നിയോഗിച്ച ഉപദേശകൻ",
    secondary_worker: "ഡ്യൂട്ടി വെൽഫെയർ ഉപദേശകൻ",
    case_status: "കേസ് അവസ്ഥ",
    support_type: "സഹായ തരം",
    household_size: "കുടുംബാംഗങ്ങളുടെ എണ്ണം",
    change_password: "പാസ്‌വേഡ് മാറ്റുക",
    current_password: "നിലവിലെ പാസ്‌വേഡ്",
    new_password: "പുതിയ പാസ്‌വേഡ്",
    confirm_new_password: "പുതിയ പാസ്‌വേഡ് സ്ഥിരീകരിക്കുക",
    btn_update_password: "പാസ്‌വേഡ് അപ്‌ഡേറ്റ് ചെയ്യുക",

    // Allocated Assistance
    assistance_title: "അനുവദിച്ച സഹായവും ഗ്രാന്റ് രേഖകളും",
    assistance_subtitle: "സിന്ധിയ ട്രസ്റ്റ് അനുവദിച്ച സാമ്പത്തിക, അടിയന്തര സഹായങ്ങൾ.",
    filter_all: "എല്ലാം അംഗീകരിച്ചു",
    filter_pending: "തീർപ്പുകൽപ്പിക്കാത്തത്",
    filter_distributed: "വിതരണം ചെയ്തത്",
    alloc_amount: "അനുവദിച്ച സഹായ തുക",
    alloc_date: "അനുവദിച്ച തീയതി",
    alloc_purpose: "സഹായത്തിന്റെ ലക്ഷ്യം",
    alloc_method: "വിതരണ രീതി",
    alloc_award_letter: "അവാർഡ് കത്ത് (PDF)",
    download_pdf: "ഔദ്യോഗിക അറിയിപ്പ് PDF ഡൗൺലോഡ് ചെയ്യുന്നു...",
    no_allocations_found: "വിഹിതമൊന്നും കണ്ടെത്തിയില്ല.",

    // Support History
    history_title: "സഹായ ചരിത്രവും അപേക്ഷാ ലോഗും",
    history_subtitle: "നിങ്ങളുടെ മുൻകാല, സജീവ അപേക്ഷകൾ ട്രാക്ക് ചെയ്യുക.",
    col_category: "സേവന വിഭാഗം",
    col_date: "അപേക്ഷ തീയതി",
    col_urgency: "അടിയന്തിര നില",
    col_status: "അവസ്ഥ",
    col_worker: "നിയോഗിച്ച പ്രവർത്തകൻ",
    col_notes: "അപേക്ഷ കുറിപ്പുകൾ",
    no_history_records: "സഹായ അപേക്ഷകളൊന്നും രേഖപ്പെടുത്തിയിട്ടില്ല.",

    // Messages / Advocate
    translation_banner_title: "തത്സമയ ഭാഷാ കണ്ടെത്തലും വിവർത്തനവും",
    translation_banner_sub: "നിങ്ങളുടെ മാതൃഭാഷയിൽ എഴുതുക. സന്ദേശങ്ങൾ സ്വയമേവ കണ്ടെത്തുകയും ഉപദേശകനായി വിവർത്തനം ചെയ്യുകയും ചെയ്യുന്നു.",
    translate_into: "വിവർത്തനം ചെയ്യുക:",
    auto_translate: "ഓട്ടോ-വിവർത്തനം",
    btn_request_interpreter: "+ തത്സമയ പരിഭാഷകനെ ആവശ്യപ്പെടുക",
    interpreter_requested: "പരിഭാഷകനെ ആവശ്യപ്പെട്ടിട്ടുണ്ട്",
    threads_title: "സംഭാഷണങ്ങളും കേസ് ചർച്ചകളും",
    active_thread_title: "നേരിട്ടുള്ള സന്ദേശമയയ്ക്കൽ",
    direct_caseworker: "നേരിട്ടുള്ള കേസ്‌വർക്കർ:",
    gdpr_encrypted: "UK GDPR 256-ബിറ്റ് എൻക്രിപ്റ്റ് ചെയ്തത്",
    encrypted_banner: "ഈ സന്ദേശങ്ങൾ യുകെ ചാരിറ്റി നിയമപ്രകാരം രഹസ്യവും സുരക്ഷിതവുമാണ്.",
    no_messages_yet: "ഇതുവരെ സന്ദേശങ്ങളൊന്നുമില്ല",
    no_messages_sub: "കേസ്‌വർക്കറുമായി സംഭാഷണം ആരംഭിക്കാൻ താഴെ ഒരു സന്ദേശമോ വോയ്‌സ് നോട്ടോ അയക്കുക.",
    chat_placeholder: "നിങ്ങളുടെ കേസ്‌വർക്കർക്ക് ഒരു സന്ദേശം ടൈപ്പ് ചെയ്യുക (അല്ലെങ്കിൽ നിങ്ങളുടെ ഭാഷയിൽ എഴുതുക)...",
    btn_send: "അയക്കുക",
    btn_voice_note: "വോയ്‌സ് നോട്ട്",
    recording_text: "ശബ്ദം റെക്കോർഡ് ചെയ്യുന്നു...",
    btn_stop_record: "നിർത്തുക & അറ്റാച്ചുചെയ്യുക",
    btn_translate_msg: "സന്ദേശം വിവർത്തനം ചെയ്യുക",
    original_text: "യഥാർത്ഥ ടെക്സ്റ്റ്:",
    original_audio_transcript: "യഥാർത്ഥ ഓഡിയോ ട്രാൻസ്ക്രിപ്റ്റ്:",

    // Notifications
    notifications_title: "അറിയിപ്പുകളും കേസ് മുന്നറിയിപ്പുകളും",
    notifications_subtitle: "നിങ്ങളുടെ അപേക്ഷകളിലെയും സന്ദേശങ്ങളിലെയും പുതിയ വിവരങ്ങൾ.",
    btn_mark_all_read: "എല്ലാം വായിച്ചതായി അടയാളപ്പെടുത്തുക",
    no_notifications: "പുതിയ അറിയിപ്പുകളൊന്നുമില്ല",

    // Language Settings
    lang_settings_title: "ഭാഷാ ക്രമീകരണങ്ങളും പരിഭാഷക മുൻഗണനകളും",
    lang_settings_subtitle: "നിങ്ങൾക്കിഷ്ടമുള്ള ഭാഷ തിരഞ്ഞെടുക്കുക. എല്ലാ ആശയവിനിമയങ്ങൾക്കും മീറ്റിംഗുകൾക്കും സിന്ധിയ ട്രസ്റ്റ് വിവർത്തനം നൽകുന്നു.",
    btn_save_language: "ഭാഷ തിരഞ്ഞെടുപ്പ് സേവ് ചെയ്യുക",
    toast_lang_saved: "ഭാഷ മുൻഗണനകൾ വിജയകരമായി അപ്‌ഡേറ്റ് ചെയ്തു. പോർട്ടലിലെ എല്ലാ ഉള്ളടക്കവും ഇപ്പോൾ തിരഞ്ഞെടുത്ത ഭാഷയിൽ ലഭ്യമാണ്.",

    // Modals
    modal_request_title: "സഹായമോ അടിയന്തര ആശ്വാസമോ അഭ്യർത്ഥിക്കുക",
    modal_request_sub: "നിങ്ങളുടെ അപേക്ഷ നേരിട്ട് കേസ്‌വർക്കറിലേക്ക് എത്തുന്നു",
    form_category: "സഹായ വിഭാഗം *",
    form_urgency: "അടിയന്തിര നില *",
    form_notes: "ചുരുങ്ങിയ വിവരങ്ങൾ / എന്താണ് ആവശ്യം *",
    form_notes_placeholder: "നിങ്ങൾക്ക് അടിയന്തിരമായി എന്താണ് വേണ്ടതെന്ന് ചുരുക്കമായി വിവരിക്കുക...",
    btn_cancel: "റദ്ദാക്കുക",
    btn_submit_request: "അപേക്ഷ സമർപ്പിക്കുക",
    submitting: "സമർപ്പിക്കുന്നു...",
    modal_logout_title: "ലോഗ് ഔട്ട് സ്ഥിരീകരിക്കുക",
    modal_logout_desc: "പോർട്ടലിൽ നിന്ന് ലോഗ് ഔട്ട് ചെയ്യണമെന്ന് ഉറപ്പാണോ?",
    kpi_distributed_sub: "ആകെ അംഗീകരിച്ചതും വിതരണം ചെയ്തതുമായ കമ്മ്യൂണിറ്റി റിലീഫ് സഹായം.",
    kpi_allocated_sub: "നിലവിൽ പൂർത്തിയാക്കിക്കൊണ്ടിരിക്കുന്ന സജീവ ഗ്രാന്റുകളും സഹായങ്ങളും.",
    advocate_details_title: "നിയോഗിക്കപ്പെട്ട അഡ്വക്കേറ്റിന്റെ വിവരങ്ങൾ",
    active_advocate_badge: "സജീവ അഡ്വക്കേറ്റ്",
    advocate_role_title: "സീനിയർ ഫാമിലി വെൽഫെയർ & ക്രൈസിസ് അഡ്വക്കേറ്റ്",
    available_today: "• ഇന്ന് കൺസൾട്ടേഷന് ലഭ്യമാണ്",
    direct_helpline_label: "നേരിട്ടുള്ള ഹെൽപ്പ്‌ലൈൻ:",
    duty_email_label: "ഡ്യൂട്ടി ഇമെയിൽ:",
    duty_hours_text: "ഡ്യൂട്ടി സമയം: തിങ്കൾ – വെള്ളി, രാവിലെ 9:00 – വൈകിട്ട് 4:30",
    btn_message_caseworker: "കേസ്‌വർക്കർക്ക് സന്ദേശമയക്കുക",
    btn_call_caseworker: "കേസ്‌വർക്കറെ വിളിക്കുക",
    tab_recent_messages: "സമീപകാല സന്ദേശങ്ങൾ",
    tab_notifications: "അറിയിപ്പുകൾ",
    view_all_arrow: "എല്ലാം കാണുക →",
    duty_office_badge: "ഡ്യൂട്ടി ഓഫീസ്",
    welcome_portal_message: "\"സിന്ധിയ ട്രസ്റ്റ് ക്ലയന്റ് പോർട്ടലിലേക്ക് സ്വാഗതം. നിങ്ങൾക്ക് നിങ്ങളുടെ കേസ് ഫയൽ പരിശോധിക്കാനും അനുവദിച്ച സഹായം കാണാനും അടിയന്തര സഹായം അഭ്യർത്ഥിക്കാനും കഴിയും.\"",
    btn_open_advocate_thread: "അഡ്വക്കേറ്റ് മെസ്സേജിംഗ് ത്രെഡ് തുറക്കുക →",
    no_active_notifications: "സജീവ അറിയിപ്പുകൾ ഒന്നും രേഖപ്പെടുത്തിയിട്ടില്ല.",
    filter_all_records: "എല്ലാ രേഖകളും",
    filter_received: "ലഭിച്ചു",
    filter_approved: "അംഗീകരിച്ചു",
    filter_cancelled: "റദ്ദാക്കി",
    filter_completed: "പൂർത്തിയായി",
    tab_applied_requests: "അപേക്ഷിച്ച അഭ്യർത്ഥനകൾ",
    col_assistance_type: "സഹായ തരം",
    col_amount: "തുക",
    col_action: "നടപടി",
    is_typing: "ടൈപ്പ് ചെയ്യുന്നു...",
    approved_by_trustees: "ട്രസ്റ്റികൾ അംഗീകരിച്ചത്",
    download_award_summary: "അവാർഡ് സംഗ്രഹം ഡൗൺലോഡ് ചെയ്യുക (PDF)",
    active_allocations_count: "സജീവ അലോക്കേഷൻ(കൾ)",
    active_approved_grants: "സജീവ അംഗീകൃത ഗ്രാന്റുകൾ",
    allocations_badge: "അലോക്കേഷനുകൾ",
    trustee_verified_auth: "100% ട്രസ്റ്റി സ്ഥിരീകരിച്ചതും അധികാരപ്പെടുത്തിയതും",
    filter_disbursed_active: "വിതരണം ചെയ്തതും സജീവവുമായത്",
    btn_grant_cards: "ഗ്രാന്റ് കാർഡുകൾ",
    btn_table_view: "ടേബിൾ വ്യൂ",
    search_assistance_placeholder: "ഉദ്ദേശ്യം, ഗ്രാന്റ്, റഫറൻസ് തിരയുക...",
    alloc_details_governance: "സഹായ വിവരങ്ങളും ഭരണവും",
    lbl_funding_partner: "ഫണ്ടിംഗ് പങ്കാളി:",
    lbl_supervising_caseworker: "മേൽനോട്ട കേസ്‌വർക്കർ:",
    lbl_disbursement_method: "വിതരണ രീതി:",
    lbl_trustee_authority: "ട്രസ്റ്റി അതോറിറ്റി:",
    lbl_permitted_use: "അനുവദനീയമായ ഉപയോഗം:",
    milestone_tracker_title: "നിലവിലെ അവസ്ഥയും നാഴികക്കല്ലുകളും",
    valid_through: "കാലാവധി:",
    current_relief_period: "നിലവിലെ ആശ്വാസ കാലയളവ്",
    certified_care_charter: "സിന്ധിയ ട്രസ്റ്റ് കെയർ ചാർട്ടർ പ്രകാരം സാക്ഷ്യപ്പെടുത്തിയത്",
    btn_award_letter_pdf: "അവാർഡ് ലെറ്റർ (PDF)",
    btn_view_full_details: "പൂർണ്ണ വിവരങ്ങൾ കാണുക →",
    view_details: "വിവരങ്ങൾ കാണുക",
    tbl_col_allocated_amount: "അനുവദിച്ച തുക",
    tbl_col_purpose_ref: "അലോക്കേഷൻ ഉദ്ദേശ്യം",
    tbl_col_alloc_date: "അലോക്കേഷൻ തീയതി",
    tbl_col_current_status: "നിലവിലെ അവസ്ഥ",
    tbl_col_details_action: "വിവരങ്ങളും നടപടിയും",
    btn_close: "അടയ്ക്കുക",
    btn_print_notice: "അലോക്കേഷൻ നോട്ടീസ് പ്രിന്റ് ചെയ്യുക",
    advocate_dossier_title: "നിയോഗിക്കപ്പെട്ട അഡ്വക്കേറ്റിന്റെ രേഖകൾ",
    btn_book_appointment: "അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യുക",
    lbl_preferred_name: "ഇഷ്ടമുള്ള പേര് / സംബോധന *",
    lbl_preferred_lang: "സംസാരിക്കാനും എഴുതാനും ഇഷ്ടപ്പെടുന്ന ഭാഷ",
    btn_save_personal_info: "വ്യക്തിഗത വിവരങ്ങൾ സംരക്ഷിക്കുക",
    btn_save_contact_details: "ബന്ധപ്പെടാനുള്ള വിവരങ്ങൾ സംരക്ഷിക്കുക",
    "badge_support_archive": "പിന്തുണ ശേഖരം",
    "lbl_case_ref": "കേസ് റഫറൻസ്:",
    "kpi_support_received": "ലഭിച്ച പിന്തുണ",
    "kpi_disbursed_received": "വിതരണം ചെയ്തതും ലഭിച്ചതുമായ ഗ്രാന്റുകൾ",
    "kpi_allocated_support": "അനുവദിച്ച പിന്തുണ",
    "kpi_pending_payout": "വിതരണം ചെയ്യാനുള്ള ഗ്രാന്റുകൾ",
    "kpi_total_tracked": "ആകെ ട്രാക്ക് ചെയ്ത സഹായം",
    "kpi_records": "രേഖകൾ",
    "kpi_casework_ledger_active": "ഔദ്യോഗിക കേസ് ലെഡ്ജർ സജീവം",
    "status_received": "ലഭിച്ചു",
    "status_approved": "അംഗീകരിച്ചു",
    "th_assistance_type": "സഹായ തരം",
    "th_amount": "തുക",
    "th_status": "നില",
    "th_date": "തിയ്യതി",
    "th_action": "നടപടി",
    "btn_view_details": "വിശദാംശങ്ങൾ കാണുക",
    "lbl_submitted_by_client": "ക്ലയന്റ് സമർപ്പിച്ചത്",
    "lbl_allocated_prefix": "അനുവദിച്ചത്: ",
    "footer_certified_ledger": "{name}-നുള്ള സാക്ഷ്യപ്പെടുത്തിയ ഔദ്യോഗിക സഹായ ലെഡ്ജർ • UK Charity No. 1137350.",
    "milestones_title": "കേസ്വർക്ക് നാഴികക്കല്ലുകളും സമയക്രമവും",
    "milestones_sub": "കൂടിയാലോചനകൾ, ഗ്രാന്റ് വിതരണം, വിലയിരുത്തലുകൾ എന്നിവയുടെ ചരിത്രം.",
    "step_intake_assigned": "കേസ് ഇൻടേക്ക് & അഡ്വക്കേറ്റ് നിയമനം",
    "step_account_active": "ഗുണഭോക്തൃ അക്കൗണ്ട് സജീവവും സ്ഥിരീകരിച്ചതുമാണ്",
    "step_intake_desc": "സിന്ധിയ ട്രസ്റ്റ് പോർട്ടലിൽ രജിസ്റ്റർ ചെയ്ത ക്ലയന്റ്. പ്രത്യേക കേസ് വർക്കറെ നിയമിച്ചു.",
    "btn_download_ledger": "ഔദ്യോഗിക പിന്തുണ ലെഡ്ജർ ഡൗൺലോഡ് ചെയ്യുക",
    "modal_assistance_details": "സഹായ വിവരങ്ങൾ",
    "lbl_allocated_funds_title": "സഹായ അഭ്യർത്ഥനകളിൽ നിന്ന് അനുവദിച്ച ഫണ്ട്",
    "lbl_total_allocated_prefix": "ആകെ അനുവദിച്ചത്: ",
    "lbl_admin_feedback": "അഡ്മിൻ അവലോകന കുറിപ്പുകളും ഫീഡ്‌ബാക്കും:",
    "btn_download_statement": "സ്റ്റേറ്റ്‌മെന്റ് ഡൗൺലോഡ് ചെയ്യുക",
    "lbl_credentials": "പ്രൊഫഷണൽ യോഗ്യതകൾ:",
    "lbl_badge_id": "അഡ്വക്കേറ്റ് ബാഡ്ജ് ഐഡി:",
    "lbl_office_hours": "ഓഫീസ് സമയം:",
    "lbl_office_loc": "ഓഫീസ് സ്ഥാനം:",
    "lbl_casework_languages": "കേസ്വർക്ക് ഭാഷകൾ:",
    "lbl_advocate_bio": "അഡ്വക്കേറ്റിന്റെ പശ്ചാത്തലം",
    "urgency_high": "ഉയർന്ന മുൻഗണന (24-48 മണിക്കൂറിനുള്ളിൽ അടിയന്തര ആവശ്യങ്ങൾ)",
    "urgency_critical": "അടിയന്തിര ഘട്ടം (തൽക്ഷണ പ്രതിസന്ധി)",
    "urgency_medium": "സാധാരണ പിന്തുണ (അടുത്ത 3-5 പ്രവൃത്തി ദിവസങ്ങൾ)",
    "lbl_supporting_docs": "സഹായക രേഖകൾ",
    "lbl_attach_docs_hint": "ബില്ലുകൾ, കത്തുകൾ, അറിയിപ്പുകൾ, ഐഡികൾ എന്നിവ ചേർക്കുക",
    "btn_add_supporting_docs": "+ സഹായക രേഖകൾ ചേർക്കുക (ഒന്നിലധികം അനുവദനീയം)",
    "profile_personal_sub": "ഔദ്യോഗിക രേഖകൾ കണ്ട് വിവരങ്ങൾ അപ്‌ഡേറ്റ് ചെയ്യുക.",
    "lbl_full_legal_name": "പൂർണ്ണ നിയമപരമായ പേര് (ഔദ്യോഗിക രേഖ)",
    "lbl_verified_record": "സ്ഥിരീകരിച്ച രേഖ",
    "lbl_legal_name_hint": "നിങ്ങളുടെ നിയമപരമായ പേര് മാറ്റാൻ കേസ് വർക്കറുടെ പരിശോധന ആവശ്യമാണ്.",
    "lbl_preferred_salutation": "ഇഷ്ടമുള്ള പേര് / അഭിസംബോധന *",
    "lbl_preferred_name_hint": "കേസ് വർക്കർമാർ നിങ്ങളെ എങ്ങനെ അഭിസംബോധന ചെയ്യണമെന്ന് നിങ്ങൾ ആഗ്രഹിക്കുന്നു.",
    "lbl_case_reference_num": "ക്ലയന്റ് കേസ് റഫറൻസ് നമ്പർ",
    "lbl_dob_verified": "ജനനത്തീയതി (സ്ഥിരീകരിച്ചത്)",
    "lbl_pref_spoken_written": "സംസാരിക്കാനും എഴുതാനും ഇഷ്ടപ്പെടുന്ന ഭാഷ",
    "lbl_interpreter_session": "നേരിട്ടുള്ള സെഷനുകൾക്ക് അംഗീകൃത ദ്വിഭാഷി",
    "opt_not_required": "ആവശ്യമില്ല",
    "opt_require_interpreter": "ദ്വിഭാഷിയെ ആവശ്യമുണ്ട്",
    "profile_contact_sub": "കേസ് അപ്‌ഡേറ്റുകൾക്കായി നിങ്ങളുടെ ഫോൺ നമ്പറുകൾ, ഇമെയിൽ എന്നിവ കൈകാര്യം ചെയ്യുക.",
    "lbl_primary_phone": "പ്രധാന മൊബൈൽ നമ്പർ *",
    "lbl_secondary_phone": "മറ്റൊരു നമ്പർ / ലാൻഡ്‌ലൈൻ (നിർബന്ധമില്ല)",
    "lbl_preferred_contact_method": "ബന്ധപ്പെടാൻ താൽപ്പര്യമുള്ള രീതി",
    "lbl_best_time_to_call": "വിളിക്കാൻ ഏറ്റവും അനുയോജ്യമായ സമയം",
    "lbl_emergency_name": "അടിയന്തിര സാഹചര്യങ്ങളിൽ ബന്ധപ്പെടേണ്ടയാളുടെ പേര്",
    "lbl_emergency_phone": "അടിയന്തിര ഫോൺ നമ്പർ",
    "lbl_emergency_rel": "ബന്ധം",
    "profile_housing_sub": "ആനുകൂല്യങ്ങൾക്കായി നിങ്ങളുടെ വിലാസം കൃത്യമാണെന്ന് ഉറപ്പുവരുത്തുക.",
    "lbl_proof_verified": "തെളിവ് സ്ഥിരീകരിച്ചു",
    "lbl_address_line1": "വിലാസം വരി 1 (തെരുവും വീട്ടുനമ്പറും) *",
    "lbl_address_line2": "വിലാസം വരി 2 (ഫ്ലാറ്റ് / അപ്പാർട്ട്മെന്റ് - നിർബന്ധമില്ല)",
    "lbl_city": "പട്ടണം / നഗരം *",
    "lbl_postcode": "പോസ്റ്റ് കോഡ് *",
    "lbl_housing_tenure": "താമസ സാഹചര്യങ്ങൾ",
    "btn_save_address": "വിലാസ വിവരങ്ങൾ സേവ് ചെയ്യുക",
    "profile_security_title": "സുരക്ഷയും പാസ്‌വേഡ് മാനേജ്‌മെന്റും",
    "profile_security_sub": "ശക്തമായ പാസ്‌വേഡ് ഉപയോഗിച്ച് നിങ്ങളുടെ അക്കൗണ്ട് സുരക്ഷിതമാക്കുക.",
    "lbl_current_pw": "നിലവിലെ പാസ്‌വേഡ് *",
    "lbl_new_pw": "പുതിയ പാസ്‌വേഡ് *",
    "lbl_confirm_new_pw": "പുതിയ പാസ്‌വേഡ് സ്ഥിരീകരിക്കുക *",
    "gdpr_notice_title": "UK GDPR ഡാറ്റ പരിരക്ഷയും അനുവദനീയമായ മാറ്റങ്ങളും",
    "gdpr_notice_desc": "നിങ്ങൾക്ക് എപ്പോൾ വേണമെങ്കിലും ഫോൺ നമ്പർ, വിലാസം, പാസ്‌വേഡ് എന്നിവ മാറ്റാം.",
    "online_duty_caseworker": "ഓൺലൈൻ • ഡ്യൂട്ടി കേസ് വർക്കർ",
    "typically_replies": "ഡ്യൂട്ടി സമയത്ത് സാധാരണയായി 2 മണിക്കൂറിനുള്ളിൽ മറുപടി നൽകുന്നു",
    "btn_call_advocate": "അഡ്വക്കേറ്റിനെ വിളിക്കുക",
    "btn_view_advocate_profile": "പൂർണ്ണ പ്രൊഫൈൽ കാണുക",
    "advocate_spoken_langs": "അഡ്വക്കേറ്റ് സംസാരിക്കുന്ന ഭാഷകൾ:",
    "btn_stop_send_voice": "നിർത്തി വോയ്‌സ് നോട്ട് അയക്കുക",
    "lbl_playing_audio": "ഓഡിയോ പ്ലേ ചെയ്യുന്നു...",
    "lbl_voice_message": "വോയ്‌സ് സന്ദേശം",
    "lbl_show_orig_transcript": "യഥാർത്ഥ ഓഡിയോ ട്രാൻസ്ക്രിപ്റ്റ് കാണിക്കുക",
    "lbl_translate_transcript": "ഓഡിയോ ട്രാൻസ്ക്രിപ്റ്റ് വിവർത്തനം ചെയ്യുക",
    "lbl_translating": "വിവർത്തനം ചെയ്യുന്നു...",
    "lbl_recording_voice": "വോയ്‌സ് നോട്ട് റെക്കോർഡ് ചെയ്യുന്നു...",
    "urgent_emergency_title": "അടിയന്തിര കേസ് വർക്ക്?",
    "urgent_emergency_desc": "ഊർജ്ജ വിതരണം തടസ്സപ്പെടുകയോ അടിയന്തിര അഭയം ആവശ്യമായി വരികയോ ചെയ്താൽ 0116 254 5168 എന്ന നമ്പറിൽ വിളിക്കുക.",
    "msg_pw_changed_success": "നിങ്ങളുടെ പാസ്‌വേഡ് വിജയകരമായി മാറ്റി.",
    "btn_save": "സേവ് ചെയ്യുക",
    "lbl_show_original": "യഥാർത്ഥ സന്ദേശം കാണിക്കുക",
    "lbl_show_orig_en": "യഥാർത്ഥ ഇംഗ്ലീഷ് കാണിക്കുക",
    "btn_translate_into": "ലേക്ക് വിവർത്തനം ചെയ്യുക",
    "lbl_note_relocating": "താമസം മാറ്റുന്നതിനുള്ള കുറിപ്പ്:",
    "desc_note_relocating": "പുതിയ വീട്ടിലേക്ക് മാറുകയാണെങ്കിൽ വിലാസം മാറ്റുന്നത് സഹായം അവിടെ എത്തിക്കാൻ സഹായിക്കും.",
    "lbl_app_stage": "അപേക്ഷയുടെ ഘട്ടം",
    "lbl_award_amount": "അനുവദിച്ച തുക",
    "lbl_reference_id": "റഫറൻസ് ഐഡി",
    "lbl_submitted_for_approval": "അഡ്മിൻ അംഗീകാരത്തിനായി സമർപ്പിച്ചത്:",
    "lbl_assistance_notes": "സഹായ വ്യാപ്തിയും കുറിപ്പുകളും:",
    "lbl_supporting_docs_approval": "അംഗീകാരത്തിനായി നൽകിയ രേഖകൾ",
    "btn_view_file": "ഫയൽ കാണുക",
    "lbl_linked_allocations": "ബന്ധിപ്പിച്ച സഹായ വിഹിതങ്ങൾ",
    "lbl_total_colon": "ആകെ:",
    "lbl_intake_case_ref": "കേസ് റഫറൻസിന് കീഴിൽ രജിസ്റ്റർ ചെയ്ത ഇൻടേക്ക്:",
    "badge_recorded": "രേഖപ്പെടുത്തി",
  },

  ta: {
    lbl_effective_date: "நடைமுறைக்கு வரும் தேதி:",
    lbl_email_address: "பதிவுசெய்யப்பட்ட மின்னஞ்சல் முகவரி *",
    modal_allocation_cert_notice: "இந்த உதவித் தொகுப்பு பயனாளருக்காக தி சிந்தியா அறக்கட்டளையால் முறைப்படி மதிப்பாய்வு செய்யப்பட்டு அங்கீகரிக்கப்பட்டது",
    effective_date_label: "நடைமுறைக்கு வரும் / பட்டுவாடா தேதி",
    funding_auth_label: "நிதி பங்குதாரர் மற்றும் அங்கீகாரம்",
    permitted_terms_label: "அனுமதிக்கப்பட்ட பயன்பாடு மற்றும் விதிமுறைகள்",
    conversations_sub: "செயலில் உள்ள வழக்கு விவாதங்கள் மற்றும் முந்தைய உதவிப் பதிவுகளுக்கு இடையில் மாறவும்.",
    advocate_info_btn: "ஆலோசகர் விவரங்கள் & நேரடி உதவி எண் →",
    no_notifications_sub: "செயலில் உள்ள எச்சரிக்கைகள் எதுவும் இல்லை. உங்கள் அவசர மானியங்கள், விண்ணப்பங்கள் மற்றும் சமூகப் பணியாளர் செய்திகள் குறித்த புதுப்பிப்புகள் இங்கே நிகழ்நேரத்தில் தோன்றும்.",

    // Nav
    portal_badge: "பயனாளர் போர்ட்டல்",
    nav_dashboard: "டாஷ்போர்டு",
    nav_profile: "என் சுயவிவரம்",
    nav_assistance: "ஒதுக்கப்பட்ட உதவி",
    nav_history: "உதவி வரலாறு",
    nav_messages: "செய்திகள் / வழக்கறிஞர்",
    nav_notifications: "அறிவிப்புகள்",
    nav_language: "மொழி அமைப்புகள்",
    nav_logout: "வெளியேறு",
    helpline_title: "உதவி எண்",
    helpline_hours: "திங்கள் - வெள்ளி, காலை 9:00 - மாலை 4:30",

    // Header
    client_care_portal: "கிளையன்ட் கேர் போர்டல்",
    caseworker_prefix: "வழக்கு பணியாளர்:",
    crisis_advocate_badge: "அர்ப்பணிப்புள்ள நெருக்கடி ஆலோசகர்",
    btn_request_support: "+ ஆதரவைக் கோருங்கள்",
    btn_logout: "வெளியேறு",

    // Dashboard
    welcome_back: "மீண்டும் வருக",
    active_beneficiary: "செயலில் உள்ள பயனாளி",
    case_ref: "வழக்கு குறிப்பு:",
    gdpr_verified: "UK GDPR சரிபார்க்கப்பட்ட கணக்கு",
    display_currency: "நாணயத்தைக் காட்டு:",
    registered_contact: "பதிவுசெய்யப்பட்ட தொடர்பு",
    registered_home_address: "வீட்டு முகவரி",
    dedicated_worker: "நெருக்கடி பணியாளர்",
    case_support_status: "உதவி நிலை",
    active_support: "செயலில் உள்ள உதவி",
    stat_total_allocated: "மொத்த உதவி",
    stat_distributed: "இதுவரை வழங்கப்பட்டது",
    stat_pending_payout: "நிலுவைத் தொகை",
    stat_pending_requests: "நிலுவையில் உள்ள விண்ணப்பங்கள்",
    stat_caseworker: "வழக்கு பணியாளர்",
    stat_unread_messages: "படிக்காத செய்திகள்",
    quick_actions: "விரைவான செயல்கள்",
    qa_send_message: "செய்தி அனுப்புங்கள்",
    qa_view_grants: "மானியங்களைக் காண்க",
    qa_emergency_line: "அவசர உதவி எண்",
    recent_activity: "சமீபத்திய செயல்பாடுகள்",
    no_recent_activity: "செயல்பாடுகள் எதுவும் இல்லை.",
    active_allocations_title: "செயலில் உள்ள ஒதுக்கீடுகள்",
    no_active_allocations: "செயலில் உள்ள ஒதுக்கீடுகள் எதுவும் இல்லை.",
    view_all: "அனைத்தையும் காட்டு",

    // Profile
    profile_title: "சுயவிவரம் மற்றும் ஆவணங்கள்",
    profile_subtitle: "உங்கள் சரிபார்க்கப்பட்ட விவரங்கள் மற்றும் அவசர தொடர்புகள்.",
    personal_details: "தனிப்பட்ட விவரங்கள்",
    full_name: "முழு பெயர்",
    client_ref: "குறிப்பு எண்",
    dob: "பிறந்த தேதி",
    gender: "பாலினம்",
    primary_language: "முதன்மை மொழி",
    contact_details: "தொடர்பு விவரங்கள்",
    email_address: "மின்னஞ்சல் முகவரி",
    phone_number: "தொலைபேசி எண்",
    residential_address: "முகவரி",
    council_area: "கவுன்சில் பகுதி",
    emergency_contact: "அவசர தொடர்பு",
    next_of_kin: "உறவினர் பெயர்",
    emergency_phone: "அவசர தொலைபேசி",
    casework_assignment: "வழக்கு ஒதுக்கீடு",
    assigned_advocate: "ஆலோசகர்",
    secondary_worker: "நல ஆலோசகர்",
    case_status: "வழக்கு நிலை",
    support_type: "உதவி வகை",
    household_size: "குடும்ப உறுப்பினர்கள்",
    change_password: "கடவுச்சொல்லை மாற்றுக",
    current_password: "தற்போதைய கடவுச்சொல்",
    new_password: "புதிய கடவுச்சொல்",
    confirm_new_password: "புதிய கடவுச்சொல்லை உறுதிப்படுத்துக",
    btn_update_password: "கடவுச்சொல்லைப் புதுப்பிக்கவும்",

    // Allocated Assistance
    assistance_title: "ஒதுக்கப்பட்ட உதவி மற்றும் மானிய பதிவுகள்",
    assistance_subtitle: "Zinthiya Trust வழங்கிய நிதி மற்றும் அவசர உதவி.",
    filter_all: "அனைத்தும் அங்கீகரிக்கப்பட்டது",
    filter_pending: "நிலுவையில் உள்ளது",
    filter_distributed: "வழங்கப்பட்டது",
    alloc_amount: "உதவித் தொகை",
    alloc_date: "ஒதுக்கப்பட்ட தேதி",
    alloc_purpose: "ஒதுக்கீட்டின் நோக்கம்",
    alloc_method: "வழங்கும் முறை",
    alloc_award_letter: "அங்கீகாரக் கடிதம் (PDF)",
    download_pdf: "அதிகாரப்பூர்வ அறிவிப்பு PDF பதிவிறக்குகிறது...",
    no_allocations_found: "ஒதுக்கீடுகள் எதுவும் இல்லை.",

    // Support History
    history_title: "உதவி வரலாறு மற்றும் விண்ணப்பங்கள்",
    history_subtitle: "உங்கள் முந்தைய மற்றும் தற்போதைய விண்ணப்பங்களைக் கண்காணிக்கவும்.",
    col_category: "சேவை வகை",
    col_date: "விண்ணப்பித்த தேதி",
    col_urgency: "அவசர நிலை",
    col_status: "நிலை",
    col_worker: "பணியாளர்",
    col_notes: "குறிப்புகள்",
    no_history_records: "விண்ணப்பங்கள் எதுவும் பதிவு செய்யப்படவில்லை.",

    // Messages / Advocate
    translation_banner_title: "தானியங்கி மொழி கண்டறிதல் & நிகழ்நேர மொழிபெயர்ப்பு",
    translation_banner_sub: "உங்கள் தாய்மொழியில் எழுதுங்கள். செய்திகள் தானாகவே மொழிபெயர்க்கப்படும்.",
    translate_into: "மொழிபெயர்க்க:",
    auto_translate: "தானியங்கி மொழிபெயர்ப்பு",
    btn_request_interpreter: "+ நேரடி மொழிபெயர்ப்பாளரைக் கோருங்கள்",
    interpreter_requested: "மொழிபெயர்ப்பாளர் கோரப்பட்டுள்ளார்",
    threads_title: "உரையாடல்கள்",
    active_thread_title: "நேரடி செய்தி அனுப்புதல்",
    direct_caseworker: "நேரடி பணியாளர்:",
    gdpr_encrypted: "UK GDPR 256-பிட் குறியாக்கம்",
    encrypted_banner: "இந்தச் செய்திகள் இங்கிலாந்து அறக்கட்டளைச் சட்டத்தின் கீழ் ரகசியமானவை.",
    no_messages_yet: "இன்னும் செய்திகள் எதுவும் இல்லை",
    no_messages_sub: "நேரடியாகப் பேச கீழே ஒரு செய்தி அல்லது ஆடியோ குறிப்பை அனுப்பவும்.",
    chat_placeholder: "செய்தி தட்டச்சு செய்யவும்...",
    btn_send: "அனுப்பு",
    btn_voice_note: "ஆடியோ குறிப்பு",
    recording_text: "ஆடியோ பதிவாகிறது...",
    btn_stop_record: "நிறுத்து & இணைக்கவும்",
    btn_translate_msg: "மொழிபெயர்க்கவும்",
    original_text: "அசல் உரை:",
    original_audio_transcript: "அசல் ஆடியோ உரை:",

    // Notifications
    notifications_title: "அறிவிப்புகள்",
    notifications_subtitle: "விண்ணப்பங்கள் மற்றும் செய்திகள் பற்றிய புதிய தகவல்கள்.",
    btn_mark_all_read: "அனைத்தையும் படித்ததாகக் குறிக்கவும்",
    no_notifications: "புதிய அறிவிப்புகள் எதுவும் இல்லை",

    // Language Settings
    lang_settings_title: "மொழி அமைப்புகள்",
    lang_settings_subtitle: "உங்கள் விருப்ப மொழியைத் தேர்ந்தெடுக்கவும். அனைத்து சந்திப்புகளுக்கும் Zinthiya Trust மொழிபெயர்ப்பு வழங்குகிறது.",
    btn_save_language: "மொழி தேர்வை சேமிக்கவும்",
    toast_lang_saved: "மொழி விருப்பத்தேர்வுகள் வெற்றிகரமாக புதுப்பிக்கப்பட்டன. இப்போது அனைத்தும் நீங்கள் தேர்ந்தெடுத்த மொழியில் காட்டப்படுகின்றன.",

    // Modals
    modal_request_title: "உதவி அல்லது அவசர நிவாரணம் கோருங்கள்",
    modal_request_sub: "உங்கள் கோரிக்கை நேரடியாக உங்கள் பணியாளருக்குச் செல்லும்",
    form_category: "உதவி வகை *",
    form_urgency: "அவசர நிலை *",
    form_notes: "விவரங்கள் / என்ன தேவை *",
    form_notes_placeholder: "உங்களுக்கு என்ன தேவை என்பதை சுருக்கமாகக் குறிப்பிடவும்...",
    btn_cancel: "ரத்து செய்",
    btn_submit_request: "விண்ணப்பத்தை சமர்ப்பிக்கவும்",
    submitting: "சமர்ப்பிக்கிறது...",
    modal_logout_title: "வெளியேறுவதை உறுதிப்படுத்தவும்",
    modal_logout_desc: "நிச்சயமாக வெளியேற விரும்புகிறீர்களா?",
    kpi_distributed_sub: "மொத்த அங்கீகரிக்கப்பட்ட மற்றும் வழங்கப்பட்ட சமூக நிவாரண உதவி.",
    kpi_allocated_sub: "தற்போது செயல்பாட்டில் உள்ள மானியங்கள் மற்றும் உதவிகள்.",
    advocate_details_title: "நியமிக்கப்பட்ட வழக்கறிஞர் விவரங்கள்",
    active_advocate_badge: "செயலில் உள்ள ஆலோசகர்",
    advocate_role_title: "மூத்த குடும்ப நலன் & நெருக்கடி ஆலோசகர்",
    available_today: "• இன்று ஆலோசனைக்கு கிடைக்கிறது",
    direct_helpline_label: "நேரடி உதவி எண்:",
    duty_email_label: "பணி மின்னஞ்சல்:",
    duty_hours_text: "பணி நேரம்: திங்கள் – வெள்ளி, காலை 9:00 – மாலை 4:30",
    btn_message_caseworker: "பணியாளருக்கு செய்தி அனுப்பவும்",
    btn_call_caseworker: "பணியாளரை அழைக்கவும்",
    tab_recent_messages: "சமீபத்திய செய்திகள்",
    tab_notifications: "அறிவிப்புகள்",
    view_all_arrow: "அனைத்தையும் காண்க →",
    duty_office_badge: "பணி அலுவலகம்",
    welcome_portal_message: "\"ஜிந்தியா டிரஸ்ட் வாடிக்கையாளர் தளத்திற்கு உங்களை வரவேற்கிறோம். உங்கள் வழக்கு கோப்பை மதிப்பாய்வு செய்யலாம், ஒதுக்கப்பட்ட உதவியைச் சரிபார்க்கலாம் அல்லது அவசர உதவியைக் கோரலாம்.\"",
    btn_open_advocate_thread: "ஆலோசகர் செய்தி தொடரைத் திறக்கவும் →",
    no_active_notifications: "செயலில் உள்ள அறிவிப்புகள் எதுவும் இல்லை.",
    filter_all_records: "அனைத்து பதிவுகள்",
    filter_received: "பெறப்பட்டது",
    filter_approved: "அங்கீகரிக்கப்பட்டது",
    filter_cancelled: "ரத்து செய்யப்பட்டது",
    filter_completed: "நிறைவுற்றது",
    tab_applied_requests: "விண்ணப்பித்த கோரிக்கைகள்",
    col_assistance_type: "உதவி வகை",
    col_amount: "தொகை",
    col_action: "நடவடிக்கை",
    is_typing: "தட்டச்சு செய்கிறார்...",
    approved_by_trustees: "அறங்காவலர்களால் அங்கீகரிக்கப்பட்டது",
    download_award_summary: "விருது சுருக்கத்தைப் பதிவிறக்கவும் (PDF)",
    active_allocations_count: "செயலில் உள்ள ஒதுக்கீடுகள்",
    active_approved_grants: "செயலில் உள்ள அங்கீகரிக்கப்பட்ட மானியங்கள்",
    allocations_badge: "ஒதுக்கீடுகள்",
    trustee_verified_auth: "100% அறங்காவலர் சரிபார்க்கப்பட்டு அங்கீகரிக்கப்பட்டது",
    filter_disbursed_active: "வழங்கப்பட்ட & செயலில் உள்ளது",
    btn_grant_cards: "மானிய அட்டைகள்",
    btn_table_view: "அட்டவணைப் பார்வை",
    search_assistance_placeholder: "நோக்கம், மானியம், குறிப்பு தேடுங்கள்...",
    alloc_details_governance: "உதவி விவரங்கள் & மேலாண்மை",
    lbl_funding_partner: "நிதி பங்காளர்:",
    lbl_supervising_caseworker: "மேற்பார்வை பணியாளர்:",
    lbl_disbursement_method: "வழங்கும் முறை:",
    lbl_trustee_authority: "அறங்காவலர் அதிகாரம்:",
    lbl_permitted_use: "அனுமதிக்கப்பட்ட பயன்பாடு:",
    milestone_tracker_title: "தற்போதைய நிலை & மைல்கல் கண்காணிப்பான்",
    valid_through: "செல்லுபடியாகும் காலம்:",
    current_relief_period: "தற்போதைய நிவாரண காலம்",
    certified_care_charter: "ஜிந்தியா டிரஸ்ட் கேர் சாசனத்தின் கீழ் சான்றளிக்கப்பட்டது",
    btn_award_letter_pdf: "விருது கடிதம் (PDF)",
    btn_view_full_details: "முழு விவரங்களையும் காண்க →",
    view_details: "விவரங்களைக் காண்க",
    tbl_col_allocated_amount: "ஒதுக்கப்பட்ட தொகை",
    tbl_col_purpose_ref: "ஒதுக்கீட்டின் நோக்கம்",
    tbl_col_alloc_date: "ஒதுக்கீடு தேதி",
    tbl_col_current_status: "தற்போதைய நிலை",
    tbl_col_details_action: "விவரங்கள் & நடவடிக்கை",
    btn_close: "மூடு",
    btn_print_notice: "ஒதுக்கீடு அறிவிப்பை அச்சிடுங்கள்",
    advocate_dossier_title: "நியமிக்கப்பட்ட வழக்கறிஞர் ஆவணம்",
    btn_book_appointment: "சந்திப்பை பதிவு செய்யவும்",
    lbl_preferred_name: "விருப்பமான பெயர் / விளிப்பு *",
    lbl_preferred_lang: "பேசவும் எழுதவும் விரும்பும் மொழி",
    btn_save_personal_info: "தனிப்பட்ட தகவலைச் சேமிக்கவும்",
    btn_save_contact_details: "தொடர்பு விவரங்களைச் சேமிக்கவும்",
    "badge_support_archive": "ஆதரவு காப்பகம்",
    "lbl_case_ref": "வழக்கு குறிப்பு எண்:",
    "kpi_support_received": "பெறப்பட்ட ஆதரவு",
    "kpi_disbursed_received": "வழங்கப்பட்ட & பெறப்பட்ட மானியங்கள்",
    "kpi_allocated_support": "ஒதுக்கப்பட்ட ஆதரவு",
    "kpi_pending_payout": "பட்டுவாடா நிலுவையில் உள்ள மானியங்கள்",
    "kpi_total_tracked": "மொத்த கண்காணிக்கப்பட்ட உதவி",
    "kpi_records": "பதிவுகள்",
    "kpi_casework_ledger_active": "அதிகாரப்பூர்வ வழக்கு லெட்ஜர் செயலில் உள்ளது",
    "status_received": "பெறப்பட்டது",
    "status_approved": "அங்கீகரிக்கப்பட்டது",
    "th_assistance_type": "உதவி வகை",
    "th_amount": "தொகை",
    "th_status": "நிலை",
    "th_date": "தேதி",
    "th_action": "செயல்",
    "btn_view_details": "விவரங்களைப் பார்க்கவும்",
    "lbl_submitted_by_client": "பயனாளரால் சமர்ப்பிக்கப்பட்டது",
    "lbl_allocated_prefix": "ஒதுக்கப்பட்டது: ",
    "footer_certified_ledger": "{name}-க்கான சான்றளிக்கப்பட்ட அதிகாரப்பூர்வ உதவி லெட்ஜர் • UK Charity No. 1137350.",
    "milestones_title": "வழக்கு முக்கிய நிகழ்வுகள் & காலவரிசை",
    "milestones_sub": "ஆலோசனைகள், மானிய விநியோகம் மற்றும் நிறைவு செய்யப்பட்ட மதிப்பீடுகளின் வரலாறு.",
    "step_intake_assigned": "வழக்கு பதிவு & ஆலோசகர் நியமனம்",
    "step_account_active": "பயனாளி கணக்கு செயலில் உள்ளது & சரிபார்க்கப்பட்டது",
    "step_intake_desc": "ஜின்தியா அறக்கட்டளை போர்ட்டலில் பயனாளி பதிவு செய்துள்ளார். பிரத்யேக வழக்கு பணியாளர் நியமிக்கப்பட்டார்.",
    "btn_download_ledger": "அதிகாரப்பூர்வ ஆதரவு லெட்ஜரைப் பதிவிறக்கவும்",
    "modal_assistance_details": "உதவி விவரங்கள்",
    "lbl_allocated_funds_title": "ஆதரவு கோரிக்கைகளிலிருந்து ஒதுக்கப்பட்ட நிதி",
    "lbl_total_allocated_prefix": "மொத்தம் ஒதுக்கப்பட்டது: ",
    "lbl_admin_feedback": "நிர்வாக மறுஆய்வுக் குறிப்புகள் & பின்னூட்டம்:",
    "btn_download_statement": "அறிக்கையைப் பதிவிறக்கவும்",
    "lbl_credentials": "தொழில்முறை சான்றுகள்:",
    "lbl_badge_id": "ஆலோசகர் பேட்ஜ் எண்:",
    "lbl_office_hours": "அலுவலக நேரம்:",
    "lbl_office_loc": "நேரடி அலுவலக இடம்:",
    "lbl_casework_languages": "வழக்கு மொழிகள்:",
    "lbl_advocate_bio": "ஆலோசகரின் பின்னணி",
    "urgency_high": "அதிக முன்னுரிமை (24-48 மணி நேரத்திற்குள் அவசரத் தேவைகள்)",
    "urgency_critical": "மிக அவசர நிலை (உடனடி நெருக்கடி)",
    "urgency_medium": "நிலையான ஆதரவு (அடுத்த 3-5 வேலை நாட்கள்)",
    "lbl_supporting_docs": "துணை ஆவணங்கள்",
    "lbl_attach_docs_hint": "பில்கள், கடிதங்கள், அறிவிப்புகள், அடையாள அட்டைகளை இணைக்கவும்",
    "btn_add_supporting_docs": "+ துணை ஆவணங்களைச் சேர்க்கவும் (பல ஆவணங்கள் அனுமதிக்கப்படுகின்றன)",
    "profile_personal_sub": "அதிகாரப்பூர்வ பதிவுகளைப் பார்த்து அடையாள விவரங்களைப் புதுப்பிக்கவும்.",
    "lbl_full_legal_name": "முழு சட்டப்பூர்வ பெயர் (அதிகாரப்பூர்வ பதிவு)",
    "lbl_verified_record": "சரிபார்க்கப்பட்ட பதிவு",
    "lbl_legal_name_hint": "உங்கள் சட்டப்பூர்வ பெயரை மாற்ற, வழக்கு பணியாளரின் அடையாள சரிபார்ப்பு தேவை.",
    "lbl_preferred_salutation": "விருப்பமான பெயர் / விளிப்பு *",
    "lbl_preferred_name_hint": "ஆலோசகர்கள் மற்றும் பணியாளர்கள் உங்களை எவ்வாறு அழைக்க வேண்டும் என்ற விருப்பம்.",
    "lbl_case_reference_num": "பயனாளி வழக்கு குறிப்பு எண்",
    "lbl_dob_verified": "பிறந்த தேதி (சரிபார்க்கப்பட்டது)",
    "lbl_pref_spoken_written": "பேசவும் எழுதவும் விரும்பும் மொழி",
    "lbl_interpreter_session": "நேரடி அமர்வுகளுக்கான அங்கீகரிக்கப்பட்ட மொழிபெயர்ப்பாளர்",
    "opt_not_required": "தேவையில்லை",
    "opt_require_interpreter": "மொழிபெயர்ப்பாளர் தேவை",
    "profile_contact_sub": "வழக்கு தகவல்களுக்கு தொலைபேசி எண்கள், மின்னஞ்சல் மற்றும் அவசர தொடர்பை நிர்வகிக்கவும்.",
    "lbl_primary_phone": "முதன்மை மொபைல் எண் *",
    "lbl_secondary_phone": "மாற்று / வீட்டு தொலைபேசி எண் (விருப்பத்தேர்வு)",
    "lbl_preferred_contact_method": "விருப்பமான தொடர்பு முறை",
    "lbl_best_time_to_call": "அழைக்க சிறந்த நேரம்",
    "lbl_emergency_name": "அவசர கால நெருங்கிய உறவினர் பெயர்",
    "lbl_emergency_phone": "அவசர தொடர்பு எண்",
    "lbl_emergency_rel": "அவசர தொடர்பாளர் உறவுமுறை",
    "profile_housing_sub": "பயன்பாட்டு வவுச்சர்கள் மற்றும் நலத்திட்ட உதவிகளுக்கு முகவரி துல்லியமாக இருப்பதை உறுதிசெய்க.",
    "lbl_proof_verified": "சான்று சரிபார்க்கப்பட்டது",
    "lbl_address_line1": "முகவரி வரி 1 (தெரு & வீட்டு எண்) *",
    "lbl_address_line2": "முகவரி வரி 2 (அடுக்குமாடி / குடியிருப்பு - விருப்பத்தேர்வு)",
    "lbl_city": "நகரம் *",
    "lbl_postcode": "அஞ்சல் குறியீடு *",
    "lbl_housing_tenure": "வீட்டு உரிமை & வாழ்க்கை நிலைமை",
    "btn_save_address": "முகவரி தகவலைச் சேமிக்கவும்",
    "profile_security_title": "பாதுகாப்பு & கடவுச்சொல் மேலாண்மை",
    "profile_security_sub": "உங்கள் கணக்கு வலுவான, இரகசிய கடவுச்சொல் மூலம் பாதுகாக்கப்படுவதை உறுதிசெய்க.",
    "lbl_current_pw": "தற்போதைய கடவுச்சொல் *",
    "lbl_new_pw": "புதிய கடவுச்சொல் *",
    "lbl_confirm_new_pw": "புதிய கடவுச்சொல்லை உறுதிப்படுத்தவும் *",
    "gdpr_notice_title": "UK GDPR தரவு பாதுகாப்பு & அனுமதிக்கப்பட்ட மாற்றங்கள்",
    "gdpr_notice_desc": "உங்கள் பெயர், தொலைபேசி எண்கள், முகவரி மற்றும் கடவுச்சொல்லை எப்போது வேண்டுமானாலும் புதுப்பிக்கலாம்.",
    "online_duty_caseworker": "ஆன்லைனில் • பணியில் உள்ள ஆலோசகர்",
    "typically_replies": "பணி நேரத்தில் பொதுவாக 2 மணி நேரத்திற்குள் பதிலளிப்பார்",
    "btn_call_advocate": "ஆலோசகரை அழைக்கவும்",
    "btn_view_advocate_profile": "முழு ஆலோசகர் சுயவிவரத்தைப் பார்க்கவும்",
    "advocate_spoken_langs": "ஆலோசகர் பேசும் மொழிகள்:",
    "btn_stop_send_voice": "நிறுத்தி குரல் செய்தியை அனுப்பவும்",
    "lbl_playing_audio": "ஆடியோ இயங்குகிறது...",
    "lbl_voice_message": "குரல் செய்தி",
    "lbl_show_orig_transcript": "அசல் ஆடியோ படியைக் காட்டு",
    "lbl_translate_transcript": "ஆடியோ படியை மொழிபெயர்க்கவும்",
    "lbl_translating": "மொழிபெயர்க்கப்படுகிறது...",
    "lbl_recording_voice": "குரல் செய்தி பதிவு செய்யப்படுகிறது...",
    "urgent_emergency_title": "அவசர வழக்கு தேவையா?",
    "urgent_emergency_desc": "மின்சாரம்/எரிவாயு துண்டிக்கப்பட்டாலோ அல்லது அவசர புகலிடம் தேவைப்பட்டாலோ 0116 254 5168 என்ற எண்ணை அழைக்கவும்.",
    "msg_pw_changed_success": "உங்கள் கடவுச்சொல் வெற்றிகரமாக மாற்றப்பட்டது.",
    "btn_save": "சேமி",
    "lbl_show_original": "அசல் செய்தியைக் காட்டு",
    "lbl_show_orig_en": "அசல் ஆங்கிலத்தைக் காட்டு",
    "btn_translate_into": "க்கு மொழிபெயர்க்கவும்",
    "lbl_note_relocating": "குடியேறுவதற்கான குறிப்பு:",
    "desc_note_relocating": "புதிய இடத்திற்கு மாறினால் முகவரியைப் புதுப்பிக்கவும்.",
    "lbl_app_stage": "விண்ணப்ப நிலை",
    "lbl_award_amount": "வழங்கப்பட்ட தொகை",
    "lbl_reference_id": "குறிப்பு ஐடி",
    "lbl_submitted_for_approval": "நிர்வாக ஒப்புதலுக்காக நீங்கள் சமர்ப்பித்தவை:",
    "lbl_assistance_notes": "உதவி வரம்பு & குறிப்புகள்:",
    "lbl_supporting_docs_approval": "ஒப்புதலுக்காக வழங்கப்பட்ட துணை ஆவணங்கள்",
    "btn_view_file": "கோப்பைப் பார்க்கவும்",
    "lbl_linked_allocations": "இணைக்கப்பட்ட உதவி ஒதுக்கீடுகள்",
    "lbl_total_colon": "மொத்தம்:",
    "lbl_intake_case_ref": "வழக்கு குறிப்பு எண்ணின் கீழ் பதிவு செய்யப்பட்டது:",
    "badge_recorded": "பதிவு செய்யப்பட்டது",
  },
};

/**
 * Helper to translate a key into the active language, falling back to English or fallbackText.
 */
export function getBeneficiaryText(
  key: string,
  lang: string = "en",
  fallbackText?: string
): string {
  const targetLang = (lang as SupportedLanguage) in BENEFICIARY_TRANSLATIONS
    ? (lang as SupportedLanguage)
    : "en";

  const translation = BENEFICIARY_TRANSLATIONS[targetLang]?.[key];
  if (translation) return translation;

  const enTranslation = BENEFICIARY_TRANSLATIONS.en?.[key];
  if (enTranslation) return enTranslation;

  return fallbackText || key;
}

/**
 * Multilingual category dictionary mapping known database assistance types
 * to localized human-readable labels.
 */
export const ASSISTANCE_TYPE_TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    "OTHER": "Other Support",
    "OTHERS": "Other Support",
    "Emergency Food & Nutrition": "Emergency Food & Nutrition",
    "Food & Nutrition": "Emergency Food & Nutrition",
    "EMERGENCY_FOOD": "Emergency Food & Nutrition",
    "Education": "Education & Schooling Support",
    "EDUCATION": "Education & Schooling Support",
    "Medical Assistance": "Medical Assistance & Healthcare",
    "MEDICAL": "Medical Assistance & Healthcare",
    "Emergency Financial Support": "Emergency Financial Support",
    "EMERGENCY_FINANCIAL": "Emergency Financial Support",
    "Utility Bill Relief & Energy Support": "Utility Bill Relief & Energy Support",
    "Energy & Utility Support": "Utility Bill Relief & Energy Support",
    "UTILITIES": "Utility Bill Relief & Energy Support",
    "Domestic Violence Crisis Intervention": "Domestic Violence Crisis Intervention",
    "DOMESTIC_VIOLENCE": "Domestic Violence Crisis Intervention",
    "Housing & Tenancy Deposit Grant": "Housing & Tenancy Deposit Grant",
    "HOUSING": "Housing & Tenancy Deposit Grant",
    "Clothing & Baby Essentials": "Clothing & Baby Essentials",
    "CLOTHING": "Clothing & Baby Essentials",
    "Community Relief": "Community Relief",
    "Crisis Relief": "Crisis Relief",
    "Relief Aid": "Relief Aid",
    "General Beneficiary Support": "General Beneficiary Support",
    "GENERAL_SUPPORT": "General Beneficiary Support"
  },
  pl: {
    "OTHER": "Inne wsparcie",
    "OTHERS": "Inne wsparcie",
    "Emergency Food & Nutrition": "Awaryjna żywność i żywienie",
    "Food & Nutrition": "Awaryjna żywność i żywienie",
    "EMERGENCY_FOOD": "Awaryjna żywność i żywienie",
    "Education": "Wsparcie edukacyjne i szkolne",
    "EDUCATION": "Wsparcie edukacyjne i szkolne",
    "Medical Assistance": "Pomoc medyczna i zdrowotna",
    "MEDICAL": "Pomoc medyczna i zdrowotna",
    "Emergency Financial Support": "Awaryjne wsparcie finansowe",
    "EMERGENCY_FINANCIAL": "Awaryjne wsparcie finansowe",
    "Utility Bill Relief & Energy Support": "Ulga w rachunkach i wsparcie energetyczne",
    "Energy & Utility Support": "Ulga w rachunkach i wsparcie energetyczne",
    "UTILITIES": "Ulga w rachunkach i wsparcie energetyczne",
    "Domestic Violence Crisis Intervention": "Interwencja w kryzysie przemocy domowej",
    "DOMESTIC_VIOLENCE": "Interwencja w kryzysie przemocy domowej",
    "Housing & Tenancy Deposit Grant": "Dotacja na kaucję i mieszkanie",
    "HOUSING": "Dotacja na kaucję i mieszkanie",
    "Clothing & Baby Essentials": "Odzież i artykuły dla dzieci",
    "CLOTHING": "Odzież i artykuły dla dzieci",
    "Community Relief": "Pomoc społeczna",
    "Crisis Relief": "Pomoc kryzysowa",
    "Relief Aid": "Pomoc doraźna",
    "General Beneficiary Support": "Ogólne wsparcie beneficjenta",
    "GENERAL_SUPPORT": "Ogólne wsparcie beneficjenta"
  },
  gu: {
    "OTHER": "અન્ય સહાય",
    "OTHERS": "અન્ય સહાય",
    "Emergency Food & Nutrition": "કટોકટી ખોરાક અને પોષણ",
    "Education": "શિક્ષણ સહાય",
    "Medical Assistance": "તબીબી સહાય",
    "Emergency Financial Support": "કટોકટી નાણાકીય સહાય",
    "Utility Bill Relief & Energy Support": "યુટિલિટી બિલ રાહત અને ઉર્જા સહાય",
    "Domestic Violence Crisis Intervention": "ઘરેલું હિંસા કટોકટી સહાય",
    "Housing & Tenancy Deposit Grant": "હાઉસિંગ અને ડિપોઝિટ ગ્રાન્ટ",
    "Clothing & Baby Essentials": "કપડાં અને બાળકની જરૂરી વસ્તુઓ",
    "Community Relief": "સમુદાય રાહત",
    "Crisis Relief": "કટોકટી રાહત",
    "Relief Aid": "રાહત સહાય",
    "General Beneficiary Support": "સામાન્ય લાભાર્થી સહાય"
  },
  hi: {
    "OTHER": "अन्य सहायता",
    "OTHERS": "अन्य सहायता",
    "Emergency Food & Nutrition": "आपातकालीन भोजन एवं पोषण",
    "Education": "शिक्षा एवं स्कूल सहायता",
    "Medical Assistance": "चिकित्सा सहायता",
    "Emergency Financial Support": "आपातकालीन वित्तीय सहायता",
    "Utility Bill Relief & Energy Support": "उपयोगिता बिल राहत एवं ऊर्जा सहायता",
    "Domestic Violence Crisis Intervention": "घरेलू हिंसा संकट हस्तक्षेप",
    "Housing & Tenancy Deposit Grant": "आवास एवं किराया जमा अनुदान",
    "Clothing & Baby Essentials": "कपड़े एवं शिशु आवश्यकताएं",
    "Community Relief": "सामुदायिक राहत",
    "Crisis Relief": "संकट राहत",
    "Relief Aid": "राहत सहायता",
    "General Beneficiary Support": "सामान्य लाभार्थी सहायता"
  },
  pa: {
    "OTHER": "ਹੋਰ ਸਹਾਇਤਾ",
    "OTHERS": "ਹੋਰ ਸਹਾਇਤਾ",
    "Emergency Food & Nutrition": "ਐਮਰਜੈਂਸੀ ਭੋਜਨ ਅਤੇ ਪੋਸ਼ਣ",
    "Education": "ਸਿੱਖਿਆ ਸਹਾਇਤਾ",
    "Medical Assistance": "ਮੈਡੀਕਲ ਸਹਾਇਤਾ",
    "Emergency Financial Support": "ਐਮਰਜੈਂਸੀ ਵਿੱਤੀ ਸਹਾਇਤਾ",
    "Utility Bill Relief & Energy Support": "ਬਿੱਲ ਰਾਹਤ ਅਤੇ ਊਰਜਾ ਸਹਾਇਤਾ",
    "Domestic Violence Crisis Intervention": "ਘਰੇਲੂ ਹਿੰਸਾ ਸੰਕਟ ਸਹਾਇਤਾ",
    "Housing & Tenancy Deposit Grant": "ਰਿਹਾਇਸ਼ ਅਤੇ ਡਿਪਾਜ਼ਿਟ ਗ੍ਰਾਂਟ",
    "Clothing & Baby Essentials": "ਕੱਪੜੇ ਅਤੇ ਬੱਚਿਆਂ ਦੀਆਂ ਲੋੜਾਂ",
    "Community Relief": "ਕਮਿਊਨਿਟੀ ਰਾਹਤ",
    "Crisis Relief": "ਸੰਕਟ ਰਾਹਤ",
    "Relief Aid": "ਰਾਹਤ ਸਹਾਇਤਾ",
    "General Beneficiary Support": "ਆਮ ਲਾਭਪਾਤਰੀ ਸਹਾਇਤਾ"
  },
  ur: {
    "OTHER": "دیگر امداد",
    "OTHERS": "دیگر امداد",
    "Emergency Food & Nutrition": "ہنگامی خوراک اور غذائیت",
    "Education": "تعلیم و سکول کی امداد",
    "Medical Assistance": "طبی امداد",
    "Emergency Financial Support": "ہنگامی مالی امداد",
    "Utility Bill Relief & Energy Support": "یوٹیلیٹی بل ریلیف اور توانائی امداد",
    "Domestic Violence Crisis Intervention": "گھریلو تشدد بحران کی مدد",
    "Housing & Tenancy Deposit Grant": "رہائش اور کرایہ ڈپازٹ گرانٹ",
    "Clothing & Baby Essentials": "لباس اور بچوں کا سامان",
    "Community Relief": "کمیونٹی ریلیف",
    "Crisis Relief": "بحران ریلیف",
    "Relief Aid": "امدادی سامان",
    "General Beneficiary Support": "عام مستفید امداد"
  },
  so: {
    "OTHER": "Kaalmo Kale",
    "OTHERS": "Kaalmo Kale",
    "Emergency Food & Nutrition": "Cunto Degdeg ah & Nafaqo",
    "Education": "Kaalmada Waxbarashada",
    "Medical Assistance": "Kaalmada Caafimaadka",
    "Emergency Financial Support": "Kaalmada Lacageed ee Degdegga ah",
    "Utility Bill Relief & Energy Support": "Gargaarka Biilasha & Tamarta",
    "Domestic Violence Crisis Intervention": "Faragelinta Xasaradaha Rabshadaha Qoyska",
    "Housing & Tenancy Deposit Grant": "Deeqda Guriyeynta & Dhigaalka",
    "Clothing & Baby Essentials": "Dharka & Baahiyaha Carruurta",
    "Community Relief": "Gargaarka Bulshada",
    "Crisis Relief": "Gargaarka Xasaradaha",
    "Relief Aid": "Gargaarka Guud",
    "General Beneficiary Support": "Taageerada Guud ee Macmiilka"
  },
  ar: {
    "OTHER": "مساعدات أخرى",
    "OTHERS": "مساعدات أخرى",
    "Emergency Food & Nutrition": "الغذاء الطارئ والتغذية",
    "Education": "دعم التعليم والمدارس",
    "Medical Assistance": "المساعدة الطبية والرعاية الصحية",
    "Emergency Financial Support": "الدعم المالي الطارئ",
    "Utility Bill Relief & Energy Support": "إغاثة فواتير الخدمات ودعم الطاقة",
    "Domestic Violence Crisis Intervention": "التدخل في أزمات العنف الأسري",
    "Housing & Tenancy Deposit Grant": "منحة الإسكان وتأمين الإيجار",
    "Clothing & Baby Essentials": "الملابس ومستلزمات الأطفال",
    "Community Relief": "الإغاثة المجتمعية",
    "Crisis Relief": "إغاثة الأزمات",
    "Relief Aid": "مساعدات الإغاثة",
    "General Beneficiary Support": "الدعم العام للمستفيدين"
  },
  bn: {
    "OTHER": "অন্যান্য সহায়তা",
    "OTHERS": "অন্যান্য সহায়তা",
    "Emergency Food & Nutrition": "জরুরি খাদ্য ও পুষ্টি",
    "Education": "শিক্ষা ও স্কুল সহায়তা",
    "Medical Assistance": "চিকিৎসা সহায়তা",
    "Emergency Financial Support": "জরুরি আর্থিক সহায়তা",
    "Utility Bill Relief & Energy Support": "ইউটিলিটি বিল ত্রাণ ও জ্বালানি সহায়তা",
    "Domestic Violence Crisis Intervention": "পারিবারিক সহিংসতা সংকট হস্তক্ষেপ",
    "Housing & Tenancy Deposit Grant": "আবাসন ও আমানত অনুদান",
    "Clothing & Baby Essentials": "পোশাক ও শিশুদের প্রয়োজনীয় জিনিস",
    "Community Relief": "সম্প্রদায় ত্রাণ",
    "Crisis Relief": "সংকট ত্রাণ",
    "Relief Aid": "ত্রাণ সহায়তা",
    "General Beneficiary Support": "সাধারণ সুবিধাভোগী সহায়তা"
  },
  ml: {
    "OTHER": "മറ്റ് സഹായങ്ങൾ",
    "OTHERS": "മറ്റ് സഹായങ്ങൾ",
    "Emergency Food & Nutrition": "അടിയന്തര ഭക്ഷണവും പോഷകാഹാരവും",
    "Education": "വിദ്യാഭ്യാസ സഹായം",
    "Medical Assistance": "ചികിത്സാ സഹായം",
    "Emergency Financial Support": "അടിയന്തര സാമ്പത്തിക സഹായം",
    "Utility Bill Relief & Energy Support": "യൂട്ടിലിറ്റി ബിൽ ഇളവും ഊർജ്ജ സഹായവും",
    "Domestic Violence Crisis Intervention": "ഗാർഹിക പീഡന പ്രതിസന്ധി ഇടപെടൽ",
    "Housing & Tenancy Deposit Grant": "ഭവന സഹായവും ഡെപ്പോസിറ്റ് ഗ്രാന്റും",
    "Clothing & Baby Essentials": "വസ്ത്രങ്ങളും കുട്ടികൾക്കുള്ള അവശ്യവസ്തുക്കളും",
    "Community Relief": "കമ്മ്യൂണിറ്റി റിലീഫ്",
    "Crisis Relief": "പ്രതിസന്ധി ആശ്വാസം",
    "Relief Aid": "ദുരിതാശ്വാസ സഹായം",
    "General Beneficiary Support": "പൊതു ഗുണഭോക്തൃ സഹായം"
  },
  ta: {
    "OTHER": "மற்ற உதவிகள்",
    "OTHERS": "மற்ற உதவிகள்",
    "Emergency Food & Nutrition": "அவசர உணவு & ஊட்டச்சத்து",
    "Education": "கல்வி உதவி",
    "Medical Assistance": "மருத்துவ உதவி",
    "Emergency Financial Support": "அவசர நிதி உதவி",
    "Utility Bill Relief & Energy Support": "பயன்பாட்டு கட்டண நிவாரணம் & ஆற்றல் உதவி",
    "Domestic Violence Crisis Intervention": "குடும்ப வன்முறை நெருக்கடி உதவி",
    "Housing & Tenancy Deposit Grant": "வீட்டுவசதி & வைப்பு மானியம்",
    "Clothing & Baby Essentials": "ஆடைகள் & குழந்தை அத்தியாவசியப் பொருட்கள்",
    "Community Relief": "சமூக நிவாரணம்",
    "Crisis Relief": "நெருக்கடி நிவாரணம்",
    "Relief Aid": "நிவாரண உதவி",
    "General Beneficiary Support": "பொது பயனாளி ஆதரவு"
  }
};

/**
 * Multilingual status dictionary mapping known database statuses
 * to localized human-readable labels.
 */
export const STATUS_TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    "Approved • Pending Payout": "Approved • Pending Payout",
    "Approved • Disbursed": "Approved • Disbursed",
    "Scheduled upon trustee review": "Scheduled upon trustee review",

    "Approved": "Approved",
    "Received": "Received",
    "Pending Admin Approval": "Pending Admin Approval",
    "Funds Allocated": "Funds Allocated",
    "Under Assessment": "Under Assessment",
    "Disbursed": "Disbursed",
    "Declined": "Declined",
    "Cancelled": "Cancelled",
    "Cancelled by Admin": "Cancelled by Admin",
    "Awaiting Review": "Awaiting Review",
    "Awaiting Triage": "Awaiting Triage",
    "Pending Dispatch": "Pending Dispatch",
    "Completed": "Completed",
    "Pending": "Pending",
    "Pending Triage": "Pending Triage",
    "CRITICAL": "CRITICAL",
    "HIGH": "HIGH",
    "MEDIUM": "MEDIUM",
    "LOW": "LOW",
    "Application": "Application",
    "Message": "Message",
    "Disbursement": "Disbursement",
    "Recent": "Recent",
    "STANDARD": "Standard",
  },
  pl: {
    "Approved • Pending Payout": "Zatwierdzono • Oczekuje na wypłatę",
    "Approved • Disbursed": "Zatwierdzono • Wypłacono",
    "Scheduled upon trustee review": "Zaplanowano po przeglądzie powierników",

    "Approved": "Zatwierdzony",
    "Received": "Otrzymano",
    "Pending Admin Approval": "Oczekuje na zatwierdzenie administratora",
    "Funds Allocated": "Przydzielono środki",
    "Under Assessment": "W trakcie oceny",
    "Disbursed": "Wypłacono",
    "Declined": "Odrzucono",
    "Cancelled": "Anulowano",
    "Cancelled by Admin": "Anulowano przez administratora",
    "Awaiting Review": "Oczekuje na weryfikację",
    "Awaiting Triage": "Oczekuje na kwalifikację",
    "Pending Dispatch": "Oczekuje na wysyłkę",
    "Completed": "Zakończono",
    "Pending": "Oczekujące",
    "Pending Triage": "Oczekuje na kwalifikację",
    "Application": "Wniosek",
    "Message": "Wiadomość",
    "Disbursement": "Wypłata",
    "Recent": "Niedawno",
    "CRITICAL": "KRYTYCZNY",
    "HIGH": "WYSOKI",
    "MEDIUM": "ŚREDNI",
    "LOW": "NISKI",
    "STANDARD": "STANDARDOWY",
    "DISTRIBUTED": "WYPŁACONO",
    "ALLOCATED": "PRZYZNANO",
    "PENDING": "OCZEKUJĄCE",
    "Active Thread": "Aktywny wątek",
    "Duty Caseworker": "Dyżurny doradca",
    "Online": "Dostępny",
  },
  gu: {
    "Approved • Pending Payout": "મંજૂર • ચુકવણી બાકી",
    "Approved • Disbursed": "મંજૂર • વિતરિત",
    "Scheduled upon trustee review": "ટ્રસ્ટી સમીક્ષા પર નિર્ધારિત",

    "Approved": "મંજૂર થયેલ",
    "Received": "પ્રાપ્ત થયેલ",
    "Pending Admin Approval": "એડમિન મંજૂરી બાકી",
    "Funds Allocated": "ફંડ ફાળવવામાં આવ્યું",
    "Under Assessment": "મૂલ્યાંકન હેઠળ",
    "Disbursed": "વિતરિત",
    "Declined": "નકારવામાં આવ્યું",
    "Cancelled": "રદ કરેલ",
    "Cancelled by Admin": "એડમિન દ્વારા રદ",
    "Awaiting Review": "સમીક્ષા બાકી",
    "Awaiting Triage": "તપાસ બાકી",
    "Pending Dispatch": "ડિસ્પેચ બાકી",
    "Completed": "પૂર્ણ",
    "Pending": "બાકી",
    "Application": "અરજી",
    "Message": "સંદેશ",
    "Disbursement": "ચૂકવણી",
    "Recent": "તાજેતરનું",
    "CRITICAL": "ગંભીર કટોકટી",
    "HIGH": "ઉચ્ચ",
    "MEDIUM": "મધ્યમ",
    "LOW": "ઓછું",
    "STANDARD": "પ્રમાણભૂત",
  },
  hi: {
    "Approved • Pending Payout": "स्वीकृत • भुगतान लंबित",
    "Approved • Disbursed": "स्वीकृत • वितरित",
    "Scheduled upon trustee review": "ट्रस्टी समीक्षा पर निर्धारित",

    "Approved": "स्वीकृत",
    "Received": "प्राप्त",
    "Pending Admin Approval": "व्यवस्थापक स्वीकृति लंबित",
    "Funds Allocated": "धन आवंटित",
    "Under Assessment": "आकलन के अधीन",
    "Disbursed": "वितरित",
    "Declined": "अस्वीकृत",
    "Cancelled": "रद्द",
    "Cancelled by Admin": "व्यवस्थापक द्वारा रद्द",
    "Awaiting Review": "समीक्षा लंबित",
    "Awaiting Triage": "प्रारंभिक जांच लंबित",
    "Pending Dispatch": "प्रेषण लंबित",
    "Completed": "पूर्ण",
    "Pending": "लंबित",
    "Application": "आवेदन",
    "Message": "संदेश",
    "Disbursement": "संवितरण",
    "Recent": "हाल ही में",
    "CRITICAL": "गंभीर संकट",
    "HIGH": "उच्च",
    "MEDIUM": "मध्यम",
    "LOW": "निम्न",
    "STANDARD": "मानक",
  },
  pa: {
    "Approved • Pending Payout": "ਪ੍ਰਵਾਨਿਤ • ਭੁਗਤਾਨ ਬਕਾਇਆ",
    "Approved • Disbursed": "ਪ੍ਰਵਾਨਿਤ • ਵੰਡਿਆ ਗਿਆ",
    "Scheduled upon trustee review": "ਟਰੱਸਟੀ ਸਮੀਖਿਆ 'ਤੇ ਨਿਰਧਾਰਤ",

    "Approved": "ਪ੍ਰਵਾਨਿਤ",
    "Received": "ਪ੍ਰਾਪਤ ਹੋਇਆ",
    "Pending Admin Approval": "ਐਡਮਿਨ ਮਨਜ਼ੂਰੀ ਬਕਾਇਆ",
    "Funds Allocated": "ਫੰਡ ਅਲਾਟ ਕੀਤੇ ਗਏ",
    "Under Assessment": "ਮੁਲਾਂਕਣ ਅਧੀਨ",
    "Disbursed": "ਵੰਡਿਆ ਗਿਆ",
    "Declined": "ਅਸਵੀਕਾਰ ਕੀਤਾ ਗਿਆ",
    "Cancelled": "ਰੱਦ ਕੀਤਾ ਗਿਆ",
    "Cancelled by Admin": "ਐਡਮਿਨ ਦੁਆਰਾ ਰੱਦ",
    "Awaiting Review": "ਸਮੀਖਿਆ ਦੀ ਉਡੀਕ",
    "Awaiting Triage": "ਜਾਂਚ ਦੀ ਉਡੀਕ",
    "Pending Dispatch": "ਭੇਜਣ ਦੀ ਉਡੀਕ",
    "Completed": "ਮੁਕੰਮਲ",
    "Pending": "ਬਕਾਇਆ",
    "Application": "ਅਰਜ਼ੀ",
    "Message": "ਸੁਨੇਹਾ",
    "Disbursement": "ਵੰਡ",
    "Recent": "ਹਾਲ ਹੀ ਵਿੱਚ",
    "CRITICAL": "ਗੰਭੀਰ ਐਮਰਜੈਂਸੀ",
    "HIGH": "ਉੱਚ",
    "MEDIUM": "ਦਰਮਿਆਨਾ",
    "LOW": "ਘੱਟ",
    "STANDARD": "ਮਿਆਰੀ",
  },
  ur: {
    "Approved • Pending Payout": "منظور شدہ • ادائیگی زیر التواء",
    "Approved • Disbursed": "منظور شدہ • تقسیم شدہ",
    "Scheduled upon trustee review": "ٹرسٹی کے جائزے پر شیڈول",

    "Approved": "منظور شدہ",
    "Received": "وصول شدہ",
    "Pending Admin Approval": "ایڈمن منظوری کے منتظر",
    "Funds Allocated": "فنڈز مختص",
    "Under Assessment": "زیر جائزہ",
    "Disbursed": "تقسیم شدہ",
    "Declined": "مسترد شدہ",
    "Cancelled": "منسوخ شدہ",
    "Cancelled by Admin": "ایڈمن کی طرف سے منسوخ",
    "Awaiting Review": "جائزہ کے منتظر",
    "Awaiting Triage": "ترجیحی جانچ کے منتظر",
    "Pending Dispatch": "ترسیل کے منتظر",
    "Completed": "مکمل",
    "Pending": "زیر التواء",
    "Application": "درخواست",
    "Message": "پیغام",
    "Disbursement": "ادائیگی",
    "Recent": "حالیہ",
    "CRITICAL": "انتہائی ہنگامی",
    "HIGH": "اعلی",
    "MEDIUM": "درمیانہ",
    "LOW": "کم",
    "STANDARD": "معیاری",
  },
  so: {
    "Approved • Pending Payout": "La oggolaaday • Bixintu way dhiman tahay",
    "Approved • Disbursed": "La oggolaaday • La bixiyay",
    "Scheduled upon trustee review": "Waxaa la qorsheeyay dib u eegis ka dib",

    "Approved": "La ansixiyay",
    "Received": "La helay",
    "Pending Admin Approval": "Sugaya Ansixinta Maamulka",
    "Funds Allocated": "Lacagtii La Qoondeeyay",
    "Under Assessment": "Qiimayn ku Socoto",
    "Disbursed": "La bixiyay",
    "Declined": "La diiday",
    "Cancelled": "La kansalay",
    "Cancelled by Admin": "Maamulku Kansalay",
    "Awaiting Review": "Sugaya Dib-u-eegis",
    "Awaiting Triage": "Sugaya Qiimayn",
    "Pending Dispatch": "Sugaya Diris",
    "Completed": "Dhameystiran",
    "Pending": "Laga sugayo",
    "Application": "Codsiga",
    "Message": "Farriin",
    "Disbursement": "Bixinta",
    "Recent": "Dhowaan",
    "CRITICAL": "Halis ah",
    "HIGH": "Sare",
    "MEDIUM": "Dhexdhexaad",
    "LOW": "Hoose",
    "STANDARD": "Caadiga ah",
  },
  ar: {
    "Approved • Pending Payout": "معتمد • الصرف قيد الانتظار",
    "Approved • Disbursed": "معتمد • تم الصرف",
    "Scheduled upon trustee review": "مجدول بناءً على مراجعة الأمناء",

    "Approved": "معتمد",
    "Received": "مستلم",
    "Pending Admin Approval": "بانتظار موافقة الإدارة",
    "Funds Allocated": "تم تخصيص الأموال",
    "Under Assessment": "قيد التقييم",
    "Disbursed": "تم الصرف",
    "Declined": "مرفوض",
    "Cancelled": "ملغى",
    "Cancelled by Admin": "ملغى من قبل الإدارة",
    "Awaiting Review": "بانتظار المراجعة",
    "Awaiting Triage": "بانتظار الفرز",
    "Pending Dispatch": "بانتظار الإرسال",
    "Completed": "مكتمل",
    "Pending": "معلق",
    "Application": "طلب",
    "Message": "رسالة",
    "Disbursement": "صرف",
    "Recent": "حديثاً",
    "CRITICAL": "حرج",
    "HIGH": "عالي",
    "MEDIUM": "متوسط",
    "LOW": "منخفض",
    "STANDARD": "قياسي",
  },
  bn: {
    "Approved • Pending Payout": "অনুমোদিত • অর্থপ্রদান বাকি",
    "Approved • Disbursed": "অনুমোদিত • বিতরণ করা হয়েছে",
    "Scheduled upon trustee review": "ট্রাস্টি পর্যালোচনার পর নির্ধারিত",

    "Approved": "অনুমোদিত",
    "Received": "প্রাপ্ত",
    "Pending Admin Approval": "প্রশাসকের অনুমোদনের অপেক্ষায়",
    "Funds Allocated": "তহবিল বরাদ্দ করা হয়েছে",
    "Under Assessment": "মূল্যায়নাধীন",
    "Disbursed": "বিতরণকৃত",
    "Declined": "প্রত্যাখ্যাত",
    "Cancelled": "বাতিল",
    "Cancelled by Admin": "প্রশাসক দ্বারা বাতিল",
    "Awaiting Review": "পর্যালোচনার অপেক্ষায়",
    "Awaiting Triage": "বাছাইকরণের অপেক্ষায়",
    "Pending Dispatch": "প্রেরণের অপেক্ষায়",
    "Completed": "সম্পন্ন",
    "Pending": "অপেক্ষমাণ",
    "Application": "আবেদন",
    "Message": "বার্তা",
    "Disbursement": "বিতরণ",
    "Recent": "সাম্প্রতিক",
    "CRITICAL": "সংকটজনক",
    "HIGH": "উচ্চ",
    "MEDIUM": "মাঝারি",
    "LOW": "নিম্ন",
    "STANDARD": "সাধারণ",
  },
  ml: {
    "Approved • Pending Payout": "അംഗീകരിച്ചു • വിതരണം ബാക്കി",
    "Approved • Disbursed": "അംഗീകരിച്ചു • വിതരണം ചെയ്തു",
    "Scheduled upon trustee review": "ട്രസ്റ്റി അവലോകനത്തിന് ശേഷം നിശ്ചയിച്ചിരിക്കുന്നു",

    "Approved": "അംഗീകരിച്ചു",
    "Received": "ലഭിച്ചു",
    "Pending Admin Approval": "അഡ്മിൻ അംഗീകാരത്തിനായി കാത്തിരിക്കുന്നു",
    "Funds Allocated": "ഫണ്ട് അനുവദിച്ചു",
    "Under Assessment": "വിലയിരുത്തലിൽ",
    "Disbursed": "വിതരണം ചെയ്തു",
    "Declined": "നിരസിച്ചു",
    "Cancelled": "റദ്ദാക്കി",
    "Cancelled by Admin": "അഡ്മിൻ റദ്ദാക്കി",
    "Awaiting Review": "പരിശോധന കാത്തിരിക്കുന്നു",
    "Awaiting Triage": "പ്രാഥമിക പരിശോധന കാത്തിരിക്കുന്നു",
    "Pending Dispatch": "അയയ്ക്കാൻ കാത്തിരിക്കുന്നു",
    "Completed": "പൂർത്തിയായി",
    "Pending": "തീർപ്പുകൽപ്പിച്ചിട്ടില്ല",
    "Application": "അപേക്ഷ",
    "Message": "സന്ദേശം",
    "Disbursement": "വിതരണം",
    "Recent": "സമീപകാല",
    "CRITICAL": "അടിയന്തിരം",
    "HIGH": "ഉയർന്ന",
    "MEDIUM": "ഇടത്തരം",
    "LOW": "കുറഞ്ഞ",
    "STANDARD": "സാധാരണ",
  },
  ta: {
    "Approved • Pending Payout": "அங்கீகரிக்கப்பட்டது • நிலுவையில் உள்ள பட்டுவாடா",
    "Approved • Disbursed": "அங்கீகரிக்கப்பட்டது • பட்டுவாடா செய்யப்பட்டது",
    "Scheduled upon trustee review": "அறங்காவலர் பரிசீலனைக்கு பின் திட்டமிடப்பட்டது",

    "Approved": "அங்கீகரிக்கப்பட்டது",
    "Received": "பெறப்பட்டது",
    "Pending Admin Approval": "நிர்வாகி ஒப்புதலுக்கு காத்திருக்கிறது",
    "Funds Allocated": "நிதி ஒதுக்கப்பட்டது",
    "Under Assessment": "மதிப்பீட்டில் உள்ளது",
    "Disbursed": "வழங்கப்பட்டது",
    "Declined": "நிராகரிக்கப்பட்டது",
    "Cancelled": "ரத்து செய்யப்பட்டது",
    "Cancelled by Admin": "நிர்வாகியால் ரத்து செய்யப்பட்டது",
    "Awaiting Review": "மதிப்பாய்வுக்காக காத்திருக்கிறது",
    "Awaiting Triage": "ஆய்வுக்காக காத்திருக்கிறது",
    "Pending Dispatch": "அனுப்புதலுக்கு காத்திருக்கிறது",
    "Completed": "நிறைவுற்றது",
    "Pending": "நிலுவையில் உள்ளது",
    "Application": "விண்ணப்பம்",
    "Message": "செய்தி",
    "Disbursement": "வழங்குதல்",
    "Recent": "சமீபத்திய",
    "CRITICAL": "மிக அவசரம்",
    "HIGH": "அதிக",
    "MEDIUM": "நடுத்தர",
    "LOW": "குறைந்த",
    "STANDARD": "நிலையான",
  }
};

/**
 * Translates an assistance type/category into the active language.
 */
export function translateAssistanceType(type: string | undefined | null, lang: string = "en"): string {
  if (!type) return getBeneficiaryText("other_support", lang, "Other Support");
  const targetLang = (lang as SupportedLanguage) in ASSISTANCE_TYPE_TRANSLATIONS
    ? (lang as SupportedLanguage)
    : "en";

  const clean = type.trim();
  // Direct match
  if (ASSISTANCE_TYPE_TRANSLATIONS[targetLang]?.[clean]) {
    return ASSISTANCE_TYPE_TRANSLATIONS[targetLang][clean];
  }

  // Upper / normalized match
  const upper = clean.toUpperCase();
  if (ASSISTANCE_TYPE_TRANSLATIONS[targetLang]?.[upper]) {
    return ASSISTANCE_TYPE_TRANSLATIONS[targetLang][upper];
  }

  // Fallback to English dictionary or original
  return ASSISTANCE_TYPE_TRANSLATIONS.en?.[clean] || clean;
}

/**
 * Translates a status string into the active language.
 */
export function translateStatus(status: string | undefined | null, lang: string = "en"): string {
  if (!status) return "";
  const targetLang = (lang as SupportedLanguage) in STATUS_TRANSLATIONS
    ? (lang as SupportedLanguage)
    : "en";

  const clean = status.trim();
  if (STATUS_TRANSLATIONS[targetLang]?.[clean]) {
    return STATUS_TRANSLATIONS[targetLang][clean];
  }

  const upper = clean.toUpperCase();
  if (STATUS_TRANSLATIONS[targetLang]?.[upper]) {
    return STATUS_TRANSLATIONS[targetLang][upper];
  }

  const lower = clean.toLowerCase();
  for (const [k, v] of Object.entries(STATUS_TRANSLATIONS[targetLang] || {})) {
    if (k.toLowerCase() === lower) {
      return v;
    }
  }

  return STATUS_TRANSLATIONS.en?.[clean] || clean;
}

/**
 * Translates advocate name string containing role suffixes like "(Dedicated Crisis Advocate)".
 */
export function translateAdvocateName(advocate: string | undefined | null, lang: string = "en"): string {
  if (!advocate) return getBeneficiaryText("dedicated_worker", lang, "Dedicated Crisis Worker");
  const roleTranslated = getBeneficiaryText("crisis_advocate_badge", lang, "Dedicated Crisis Advocate");
  const seniorRole = getBeneficiaryText("advocate_role_title", lang, "Senior Family Welfare & Crisis Advocate");
  const dutyWorker = getBeneficiaryText("dedicated_worker", lang, "Duty Caseworker");

  return advocate
    .replace(/\(Dedicated Crisis Advocate\)/gi, `(${roleTranslated})`)
    .replace(/Dedicated Crisis Advocate/gi, roleTranslated)
    .replace(/\(Duty Caseworker\)/gi, `(${dutyWorker})`)
    .replace(/\(Senior Family Welfare & Crisis Advocate\)/gi, `(${seniorRole})`);
}

/**
 * Translates an allocation title (e.g. "OTHER Allocation" or "Emergency Food & Nutrition Allocation").
 */
export function translateAssistanceTitle(type: string | undefined | null, lang: string = "en"): string {
  const localizedCategory = translateAssistanceType(type, lang);
  if (lang === "pl") {
    return `Przydział: ${localizedCategory}`;
  }
  if (lang === "gu" || lang === "hi" || lang === "pa") {
    return `${localizedCategory} ફાળવણી`.replace("ફાળવણી", lang === "hi" ? "आवंटन" : lang === "pa" ? "ਅਲਾਟਮੈਂਟ" : "ફાળવણી");
  }
  if (lang === "ur" || lang === "ar") {
    return `${localizedCategory} الاٹمنٹ`;
  }
  return `${localizedCategory} Allocation`;
}

/**
 * Translates milestone step labels in the assistance progression tracker.
 */
export function translateMilestoneStep(label: string, lang: string = "en"): string {
  const map: Record<string, Record<string, string>> = {
    pl: {
      "Scheduled upon trustee review": "Zaplanowano po przeglądzie powierników",

      "Application & Assessment": "Wniosek i ocena",
      "Trustee Approval": "Zatwierdzenie powierników",
      "Funds Allocated": "Środki przydzielone",
      "Disbursed / Received": "Wypłacono / Otrzymano",
      "Payout Scheduled": "Zaplanowano wypłatę",
      "Allocation Cancelled": "Przydział anulowany",
      "Revoked": "Cofnięto",
      "Cancelled": "Anulowano"
    },
    gu: {
      "Scheduled upon trustee review": "ટ્રસ્ટી સમીક્ષા પર નિર્ધારિત",

      "Application & Assessment": "અરજી અને મૂલ્યાંકન",
      "Trustee Approval": "ટ્રસ્ટી મંજૂરી",
      "Funds Allocated": "ફંડ ફાળવવામાં આવ્યું",
      "Disbursed / Received": "વિતરિત / પ્રાપ્ત",
      "Payout Scheduled": "ચુકવણી નિર્ધારિત",
      "Allocation Cancelled": "ફાળવણી રદ"
    },
    hi: {
      "Scheduled upon trustee review": "ट्रस्टी समीक्षा पर निर्धारित",

      "Application & Assessment": "आवेदन एवं मूल्यांकन",
      "Trustee Approval": "ट्रस्टी स्वीकृति",
      "Funds Allocated": "धन आवंटित",
      "Disbursed / Received": "वितरित / प्राप्त",
      "Payout Scheduled": "भुगतान निर्धारित",
      "Allocation Cancelled": "आवंटन रद्द"
    },
    pa: {
      "Scheduled upon trustee review": "ਟਰੱਸਟੀ ਸਮੀਖਿਆ 'ਤੇ ਨਿਰਧਾਰਤ",

      "Application & Assessment": "ਅਰਜ਼ੀ ਅਤੇ ਮੁਲਾਂਕਣ",
      "Trustee Approval": "ਟਰੱਸਟੀ ਪ੍ਰਵਾਨਗੀ",
      "Funds Allocated": "ਫੰਡ ਅਲਾਟ ਕੀਤੇ ਗਏ",
      "Disbursed / Received": "ਵੰਡਿਆ / ਪ੍ਰਾਪਤ ਹੋਇਆ",
      "Payout Scheduled": "ਭੁਗਤਾਨ ਨਿਰਧਾਰਤ",
      "Allocation Cancelled": "ਅਲਾਟਮੈਂਟ ਰੱਦ"
    },
    ur: {
      "Scheduled upon trustee review": "ٹرسٹی کے جائزے پر شیڈول",

      "Application & Assessment": "درخواست اور جائزہ",
      "Trustee Approval": "ٹرسٹی کی منظوری",
      "Funds Allocated": "فنڈز مختص",
      "Disbursed / Received": "تقسیم شدہ / وصول",
      "Payout Scheduled": "ادائیگی کا شیڈول",
      "Allocation Cancelled": "الاٹمنٹ منسوخ"
    }
  };

  return map[lang]?.[label] || label;
}

/**
 * Translates disbursement method strings.
 */
/**
 * Translates funding partner / grant charity names.
 */
export function translateFunder(funder: string | undefined | null, lang: string = "en"): string {
  if (!funder) return "";
  const map: Record<string, string> = {
    pl: "Fundusz Pomocy Społeczności The Zinthiya Trust",
    hi: "द ज़िंथिया ट्रस्ट कम्युनिटी हार्डशिप फंड",
    gu: "ધ ઝિન્થિયા ટ્રસ્ટ કોમ્યુનિટી હાર્ડશિપ ફંડ",
    pa: "ਦ ਜ਼ਿੰਥੀਆ ਟਰੱਸਟ ਕਮਿਊਨਿਟੀ ਹਾਰਡਸ਼ਿਪ ਫੰਡ",
    ur: "دی زنتھیا ٹرسٹ کمیونٹی ہارڈشپ فنڈ",
    so: "Sanduuqa Dhibaatada Bulshada ee The Zinthiya Trust",
    ar: "صندوق صعوبات المجتمع التابع لمؤسسة زنثيا",
    bn: "দ্য জিনথিয়া ট্রাস্ট কমিউনিটি হার্ডশিপ ফান্ড",
    ml: "ദി സിന്ധിയ ട്രസ്റ്റ് കമ്മ്യൂണിറ്റി ഹാർഡ്ഷിപ്പ് ഫണ്ട്",
    ta: "தி சிந்தியா அறக்கட்டளை சமூக இடர்பாட்டு நிதி"
  };
  if (funder.includes("The Zinthiya Trust Community Hardship Fund")) {
    return map[lang] || funder;
  }
  return funder;
}

/**
 * Translates disbursement method strings across all 11 languages.
 */
export function translateDisbursementMethod(method: string, lang: string = "en"): string {
  if (!method) return "";
  const maps: Record<string, { direct: string; bacs: string; cancelled: string }> = {
    pl: {
      direct: "Wypłacono bezpośrednim przelewem dotacji",
      bacs: "Zaplanowano przelew BACS / wysyłkę bonu",
      cancelled: "Przydział anulowany"
    },
    hi: {
      direct: "प्रत्यक्ष अनुदान हस्तांतरण द्वारा वितरित",
      bacs: "अनुसूचित BACS / वाउचर प्रेषण",
      cancelled: "आवंटन रद्द"
    },
    gu: {
      direct: "સીધા અનુદાન ટ્રાન્સફર દ્વારા વિતરિત",
      bacs: "સુનિશ્ચિત BACS / વાઉચર ડિસ્પેચ",
      cancelled: "ફાળવણી રદ"
    },
    pa: {
      direct: "ਸਿੱਧੀ ਗ੍ਰਾਂਟ ਟ੍ਰਾਂਸਫਰ ਰਾਹੀਂ ਵੰਡਿਆ ਗਿਆ",
      bacs: "ਨਿਰਧਾਰਤ BACS / ਵਾਊਚਰ ਡਿਸਪੈਚ",
      cancelled: "ਅਲਾਟਮੈਂਟ ਰੱਦ"
    },
    ur: {
      direct: "براہ راست گرانٹ ٹرانسفر کے ذریعے تقسیم کیا گیا",
      bacs: "شیڈول شدہ BACS / واؤچر ڈسپیچ",
      cancelled: "الاٹمنٹ منسوخ"
    },
    so: {
      "Scheduled upon trustee review": "Waxaa la qorsheeyay dib u eegis ka dib",

      direct: "Waxaa lagu bixiyay wareejin toos ah oo deeq ah",
      bacs: "Jadwalka BACS / Dirista foojarka",
      cancelled: "Qoondada waa la baabi'iyay"
    },
    ar: {
      "Scheduled upon trustee review": "مجدول بناءً على مراجعة الأمناء",

      direct: "تم الصرف عبر تحويل مباشر للمنحة",
      bacs: "إرسال مجدول عبر BACS / قسيمة",
      cancelled: "تم إلغاء التخصيص"
    },
    bn: {
      "Scheduled upon trustee review": "ট্রাস্টি পর্যালোচনার পর নির্ধারিত",

      direct: "সরাসরি অনুদান স্থানান্তরের মাধ্যমে বিতরণ করা হয়েছে",
      bacs: "নির্ধারিত BACS / ভাউচার প্রেরণ",
      cancelled: "বরাদ্দ বাতিল"
    },
    ml: {
      "Scheduled upon trustee review": "ട്രസ്റ്റി അവലോകനത്തിന് ശേഷം നിശ്ചയിച്ചിരിക്കുന്നു",

      direct: "നേരിട്ടുള്ള ഗ്രാന്റ് കൈമാറ്റം വഴി വിതരണം ചെയ്തു",
      bacs: "പട്ടികപ്പെടുത്തിയ BACS / വൗച്ചർ അയക്കൽ",
      cancelled: "അനുവദിച്ചത് റദ്ദാക്കി"
    },
    ta: {
      "Scheduled upon trustee review": "அறங்காவலர் பரிசீலனைக்கு பின் திட்டமிடப்பட்டது",

      direct: "நேரடி மானிய பரிமாற்றம் மூலம் பட்டுவாடா செய்யப்பட்டது",
      bacs: "திட்டமிடப்பட்ட BACS / வவுச்சர் அனுப்புதல்",
      cancelled: "ஒதுக்கீடு ரத்து செய்யப்பட்டது"
    }
  };

  const lMap = maps[lang];
  if (lMap) {
    if (method.includes("direct grant transfer")) return lMap.direct;
    if (method.includes("BACS") || method.includes("Voucher")) return lMap.bacs;
    if (method.includes("Cancelled")) return lMap.cancelled;
  }
  return method;
}

/**
 * Translates trustee authorization body text across all 11 languages.
 */
export function translateTrusteeAuthority(body: string, lang: string = "en"): string {
  if (!body) return "";
  const maps: Record<string, { approved: string; cancelled: string }> = {
    pl: {
      approved: "Zatwierdzone przez Komitet Pomocy Powierników Zinthiya",
      cancelled: "Anulowano przez administrację"
    },
    hi: {
      approved: "ज़िंथिया ट्रस्टीज़ रिलीफ कमेटी द्वारा अनुमोदित",
      cancelled: "प्रशासन द्वारा रद्द"
    },
    gu: {
      approved: "ઝિન્થિયા ટ્રસ્ટીઝ રિલીફ કમિટી દ્વારા મંજૂર",
      cancelled: "વહીવટીતંત્ર દ્વારા રદ"
    },
    pa: {
      approved: "ਜ਼ਿੰਥੀਆ ਟਰੱਸਟੀਜ਼ ਰਿਲੀਫ ਕਮੇਟੀ ਦੁਆਰਾ ਪ੍ਰਵਾਨਿਤ",
      cancelled: "ਪ੍ਰਸ਼ਾਸਨ ਦੁਆਰਾ ਰੱਦ"
    },
    ur: {
      approved: "زنتھیا ٹرسٹیز ریلیف کمیٹی کی طرف سے منظور شدہ",
      cancelled: "انتظامیہ کی طرف سے منسوخ"
    },
    so: {
      approved: "Waxaa ansixiyay Guddiga Gargaarka Wakiillada Zinthiya",
      cancelled: "Waxaa baabi'iyay Maamulka"
    },
    ar: {
      approved: "معتمد من لجنة إغاثة أمناء زنثيا",
      cancelled: "تم الإلغاء بواسطة الإدارة"
    },
    bn: {
      approved: "জিনথিয়া ট্রাস্টি রিলিফ কমিটি দ্বারা অনুমোদিত",
      cancelled: "প্রশাসন দ্বারা বাতিল"
    },
    ml: {
      approved: "സിന്ധിയ ട്രസ്റ്റീസ് റിലീഫ് കമ്മിറ്റി അംഗീകരിച്ചത്",
      cancelled: "ഭരണസമിതി റദ്ദാക്കി"
    },
    ta: {
      approved: "சிந்தியா அறங்காவலர் நிவாரணக் குழுவால் அங்கீகரிக்கப்பட்டது",
      cancelled: "நிர்வாகத்தால் ரத்து செய்யப்பட்டது"
    }
  };

  const lMap = maps[lang];
  if (lMap) {
    if (body.includes("Trustees Relief Committee")) return lMap.approved;
    if (body.includes("Cancelled")) return lMap.cancelled;
  }
  return body;
}

/**
 * Translates permitted use strings across all 11 languages.
 */
export function translatePermittedUse(use: string, lang: string = "en"): string {
  if (!use) return "";
  const maps: Record<string, { essentials: string; cancelled: string }> = {
    pl: {
      essentials: "Ograniczone do zatwierdzonych niezbędnych artykułów domowych.",
      cancelled: "Przydział został anulowany."
    },
    hi: {
      essentials: "अधिकृत आपातकालीन घरेलू आवश्यक वस्तुओं तक सीमित।",
      cancelled: "आवंटन रद्द कर दिया गया है।"
    },
    gu: {
      essentials: "અધિકૃત કટોકટી ઘરગથ્થુ આવશ્યક ચીજવસ્તુઓ સુધી મર્યાદિત.",
      cancelled: "ફાળવણી રદ કરવામાં આવી છે."
    },
    pa: {
      essentials: "ਅਧਿਕਾਰਤ ਐਮਰਜੈਂਸੀ ਘਰੇਲੂ ਜ਼ਰੂਰੀ ਚੀਜ਼ਾਂ ਤੱਕ ਸੀਮਿਤ।",
      cancelled: "ਅਲਾਟਮੈਂਟ ਰੱਦ ਕਰ ਦਿੱਤੀ ਗਈ ਹੈ।"
    },
    ur: {
      essentials: "مجاز ہنگامی گھریلو ضروری اشیاء تک محدود۔",
      cancelled: "الاٹمنٹ منسوخ کر دی گئی ہے۔"
    },
    so: {
      essentials: "Ku xaddidan waxyaabaha daruuriga ah ee qoyska ee degdegga ah.",
      cancelled: "Qoondada waa la baabi'iyay."
    },
    ar: {
      essentials: "يقتصر على المستلزمات المنزلية الأساسية المعتمدة في حالات الطوارئ.",
      cancelled: "تم إلغاء التخصيص."
    },
    bn: {
      essentials: "অনুমোদিত জরুরি গৃহস্থালী প্রয়োজনীয় সামগ্রীতে সীমাবদ্ধ।",
      cancelled: "বরাদ্দ বাতিল করা হয়েছে।"
    },
    ml: {
      essentials: "അംഗീകൃത അടിയന്തര ഗാർഹിക അവശ്യസാധനങ്ങൾക്ക് മാത്രമായി പരിമിതപ്പെടുത്തിയിരിക്കുന്നു.",
      cancelled: "അനുവദിച്ചത് റദ്ദാക്കിയിരിക്കുന്നു."
    },
    ta: {
      essentials: "அங்கீகரிக்கப்பட்ட அவசர வீட்டு உபயோகப் பொருட்களுக்கு மட்டுமே கட்டுப்படுத்தப்பட்டது.",
      cancelled: "ஒதுக்கீடு ரத்து செய்யப்பட்டுள்ளது."
    }
  };

  const lMap = maps[lang];
  if (lMap) {
    if (use.includes("household essentials")) return lMap.essentials;
    if (use.toLowerCase().includes("cancelled")) return lMap.cancelled;
  }
  return use;
}

/**
 * Translates default purpose text when notes are empty across all 11 languages.
 */
export function translateDefaultPurpose(purpose: string | undefined | null, lang: string = "en"): string {
  if (!purpose) return "";
  const maps: Record<string, { emergency: string; cancelled: string; record: string; food: string; cash: string }> = {
    pl: {
      emergency: "Awaryjna dotacja pomocowa przyznana bezpośrednio na zweryfikowane konto beneficjenta.",
      cancelled: "Przydział dotacji pomocowej został anulowany przez administrację.",
      record: "Oficjalny rejestr przyznanej pomocy przez powierników.",
      food: "Na żywność",
      cash: "Potrzebna gotówka na pilne wydatki"
    },
    hi: {
      emergency: "सत्यापित लाभार्थी खाते में सीधे आवंटित आपातकालीन ट्रस्टी राहत अनुदान।",
      cancelled: "राहत अनुदान आवंटन प्रशासन द्वारा रद्द कर दिया गया था।",
      record: "आधिकारिक ट्रस्टी आवंटित सहायता रिकॉर्ड।",
      food: "भोजन के लिए",
      cash: "तत्काल खर्चों के लिए नकद सहायता आवश्यक"
    },
    gu: {
      emergency: "ચકાસાયેલ લાભાર્થી ખાતામાં સીધી ફાળવેલ કટોકટી ટ્રસ્ટી રાહત ગ્રાન્ટ.",
      cancelled: "રાહત અનુદાન ફાળવણી વહીવટીતંત્ર દ્વારા રદ કરવામાં આવી હતી.",
      record: "સત્તાવાર ટ્રસ્ટી ફાળવેલ સહાય રેકોર્ડ.",
      food: "ખોરાક માટે",
      cash: "તાત્કાલિક ખર્ચ માટે રોકડ સહાય જરૂરી"
    },
    pa: {
      emergency: "ਤਸਦੀਕਸ਼ੁਦਾ ਲਾਭਪਾਤਰੀ ਖਾਤੇ ਵਿੱਚ ਸਿੱਧੀ ਅਲਾਟ ਕੀਤੀ ਐਮਰਜੈਂਸੀ ਟਰੱਸਟੀ ਰਾਹਤ ਗ੍ਰਾਂਟ।",
      cancelled: "ਰਾਹਤ ਗ੍ਰਾਂਟ ਅਲਾਟਮੈਂਟ ਪ੍ਰਸ਼ਾਸਨ ਦੁਆਰਾ ਰੱਦ ਕਰ ਦਿੱਤੀ ਗਈ ਸੀ।",
      record: "ਅਧਿਕਾਰਤ ਟਰੱਸਟੀ ਅਲਾਟ ਸਹਾਇਤਾ ਰਿਕਾਰਡ।",
      food: "ਭੋਜਨ ਲਈ",
      cash: "ਤੁਰੰਤ ਖਰਚਿਆਂ ਲਈ ਨਕਦੀ ਦੀ ਲੋੜ"
    },
    ur: {
      emergency: "تصدیق شدہ مستفید کنندہ کے اکاؤنٹ میں براہ راست مختص کی گئی ہنگامی ٹرسٹی ریلیف گرانٹ۔",
      cancelled: "ریلیف گرانٹ الاٹمنٹ انتظامیہ کی طرف سے منسوخ کر دی گئی تھی۔",
      record: "سرکاری ٹرسٹی مختص امدادی ریکارڈ۔",
      food: "خوراک کے لیے",
      cash: "فوری اخراجات کے لیے نقد رقم درکار ہے"
    },
    so: {
      emergency: "Deeqda gargaarka wakiillada degdegga ah oo si toos ah loogu qoondeeyay akoonka la xaqiijiyay ee ka faa'iideystaha.",
      cancelled: "Qoondada deeqda gargaarka waxaa baabi'iyay maamulka.",
      record: "Diiwaanka gargaarka ee wakiilka rasmiga ah u qoondeeyay.",
      food: "Cunto ahaan",
      cash: "Lacag caddaan ah oo loogu talagalay kharashaadka degdegga ah"
    },
    ar: {
      emergency: "منحة إغاثة طارئة من الأمناء مخصصة مباشرة لحساب المستفيد المعتمد.",
      cancelled: "تم إلغاء تخصيص منحة الإغاثة من قبل الإدارة.",
      record: "سجل المساعدة المخصصة من قبل الأمناء الرسميين.",
      food: "للغذاء",
      cash: "مطلوب مساعدة نقدية لمصاريف عاجلة"
    },
    bn: {
      emergency: "যাচাইকৃত সুবিধাভোগী অ্যাকাউন্টে সরাসরি বরাদ্দকৃত জরুরি ট্রাস্টি ত্রাণ অনুদান।",
      cancelled: "ত্রাণ অনুদান বরাদ্দ প্রশাসন দ্বারা বাতিল করা হয়েছে।",
      record: "অফিসিয়াল ট্রাস্টি বরাদ্দকৃত সহায়তা রেকর্ড।",
      food: "খাবারের জন্য",
      cash: "জরুরি খরচের জন্য নগদ অর্থ প্রয়োজন"
    },
    ml: {
      emergency: "പരിശോധിച്ചുറപ്പിച്ച ഗുണഭോക്തൃ അക്കൗണ്ടിലേക്ക് നേരിട്ട് അനുവദിച്ച അടിയന്തര ട്രസ്റ്റി റിലീഫ് ഗ്രാന്റ്.",
      cancelled: "റിലീഫ് ഗ്രാന്റ് അനുവദിച്ചത് ഭരണസമിതി റദ്ദാക്കി.",
      record: "ഔദ്യോഗിക ട്രസ്റ്റി അനുവദിച്ച സഹായ രേഖ.",
      food: "ഭക്ഷണത്തിനായി",
      cash: "അടിയന്തര ചെലവുകൾക്കായി പണം ആവശ്യമാണ്"
    },
    ta: {
      emergency: "சரிபார்க்கப்பட்ட பயனாளி கணக்கிற்கு நேரடியாக ஒதுக்கப்பட்ட அவசர அறங்காவலர் நிவாரண மானியம்.",
      cancelled: "நிவாரண மானிய ஒதுக்கீடு நிர்வாகத்தால் ரத்து செய்யப்பட்டது.",
      record: "அதிகாரப்பூர்வ அறங்காவலர் ஒதுக்கிய உதவிப் பதிவு.",
      food: "உணவுக்காக",
      cash: "அவசர செலவுகளுக்கு ரொக்க உதவி தேவை"
    }
  };

  const lMap = maps[lang];
  if (lMap) {
    if (purpose.includes("Emergency trustee relief grant allocated directly")) return lMap.emergency;
    if (purpose.includes("Relief grant allocation was cancelled")) return lMap.cancelled;
    if (purpose.includes("Official trustee allocated assistance record")) return lMap.record;
    if (purpose.toLowerCase() === "for food") return lMap.food;
    if (purpose.toLowerCase().includes("need cash") || purpose.toLowerCase().includes("need 10,000") || purpose.toLowerCase().includes("need 10000")) return lMap.cash;
  }
  return purpose;
}

/**
 * Translates validity string across all 11 languages.
 */
export function translateValidity(validity: string, lang: string = "en"): string {
  if (!validity) return "";
  const maps: Record<string, { relief: string; cancelled: string }> = {
    pl: { relief: "Bieżący okres pomocowy", cancelled: "Anulowano" },
    hi: { relief: "वर्तमान राहत अवधि", cancelled: "रद्द" },
    gu: { relief: "વર્તમાન રાહત સમયગાળો", cancelled: "રદ" },
    pa: { relief: "ਮੌਜੂਦਾ ਰਾਹਤ ਸਮਾਂ", cancelled: "ਰੱਦ" },
    ur: { relief: "موجودہ ریلیف کی مدت", cancelled: "منسوخ" },
    so: { relief: "Xilliga Gargaarka ee Hadda", cancelled: "La baabi'iyay" },
    ar: { relief: "فترة الإغاثة الحالية", cancelled: "ملغى" },
    bn: { relief: "বর্তমান ত্রাণ সময়কাল", cancelled: "বাতিল" },
    ml: { relief: "നിലവിലെ റിലീഫ് കാലയളവ്", cancelled: "റദ്ദാക്കി" },
    ta: { relief: "தற்போதைய நிவாரண காலம்", cancelled: "ரத்து செய்யப்பட்டது" }
  };
  const lMap = maps[lang];
  if (lMap) {
    if (validity.includes("Current Relief Period") || validity.includes("Current Welfare Period")) return lMap.relief;
    if (validity.includes("Cancelled")) return lMap.cancelled;
  }
  return validity;
}

export function translateHousingTenure(tenure: string, lang: string = "en"): string {
  if (lang === "pl") {
    if (tenure.includes("Private Rented")) return "Wynajem prywatny (Assured Shorthold)";
    if (tenure.includes("Council Housing")) return "Mieszkanie komunalne (Władze lokalne)";
    if (tenure.includes("Housing Association")) return "Spółdzielnia mieszkaniowa";
    if (tenure.includes("Temporary / Emergency")) return "Schronienie tymczasowe / awaryjne";
    if (tenure.includes("Owner Occupier")) return "Właściciel mieszkania (Kredyt / Własność)";
    if (tenure.includes("Supported / Refuge")) return "Zakwaterowanie wspomagane / Ośrodek wsparcia";
  }
  return tenure;
}

/**
 * Translates preferred contact methods.
 */
export function translateContactMethod(method: string, lang: string = "en"): string {
  if (lang === "pl") {
    if (method.includes("SMS & Email")) return "SMS i e-mail";
    if (method.includes("SMS Text Only")) return "Tylko SMS";
    if (method.includes("Telephone Voice Call")) return "Połączenie telefoniczne";
    if (method.includes("Email Only")) return "Tylko e-mail";
    if (method.includes("Encrypted Portal Message")) return "Zaszyfrowana wiadomość w portalu";
  }
  return method;
}

/**
 * Translates best time to call.
 */
export function translateContactHours(hours: string, lang: string = "en"): string {
  if (lang === "pl") {
    if (hours.includes("Weekdays 09:00 - 16:30")) return "Dni robocze 09:00 - 16:30 (Dowolna pora)";
    if (hours.includes("Morning")) return "Rano (09:00 - 12:00)";
    if (hours.includes("Afternoon")) return "Popołudnie (12:00 - 16:30)";
  }
  return hours;
}

/**
 * Translates urgency levels.
 */
export function translateUrgencyLevel(urgency: string, lang: string = "en"): string {
  if (lang === "pl") {
    if (urgency.includes("High Priority") || urgency === "HIGH") return "Wysoki priorytet (Pilne potrzeby w ciągu 24-48 godz.)";
    if (urgency.includes("Critical Emergency") || urgency === "CRITICAL") return "Krytyczny wypadek (Natychmiastowy kryzys)";
    if (urgency.includes("Standard Support") || urgency === "MEDIUM") return "Standardowe wsparcie (Najbliższe 3-5 dni roboczych)";
  }
  return urgency;
}

/**
 * Translates date strings and uppercase timeline status labels.
 * E.g. "18 NOV 2026" -> "18 LIS 2026", "PENDING DISPATCH" -> "OCZEKUJE NA WYSYŁKĘ".
 */
/**
 * Translates date strings and uppercase timeline status labels across all 11 languages.
 * E.g. "18 NOV 2026", "23 Nov 2026", "19 Nov", "PENDING DISPATCH", "Recent".
 */
export function translateDate(dateStr: string | undefined | null, lang: string = "en"): string {
  if (!dateStr) return "";
  const clean = dateStr.trim();
  const statusMatch = translateStatus(clean, lang);
  if (statusMatch && statusMatch.toLowerCase() !== clean.toLowerCase()) {
    return statusMatch.toUpperCase();
  }

  const MONTH_MAPS: Record<string, Record<string, string>> = {
    pl: {
      "JAN": "STY", "FEB": "LUT", "MAR": "MAR", "APR": "KWI",
      "MAY": "MAJ", "JUN": "CZE", "JUL": "LIP", "AUG": "SIE",
      "SEP": "WRZ", "OCT": "PAŹ", "NOV": "LIS", "DEC": "GRU",
      "Jan": "sty", "Feb": "lut", "Mar": "mar", "Apr": "kwi",
      "May": "maj", "Jun": "cze", "Jul": "lip", "Aug": "sie",
      "Sep": "wrz", "Oct": "paź", "Nov": "lis", "Dec": "gru",
      "Recent": "Niedawno", "recent": "niedawno"
    },
    hi: {
      "JAN": "जनवरी", "FEB": "फरवरी", "MAR": "मार्च", "APR": "अप्रैल",
      "MAY": "मई", "JUN": "जून", "JUL": "जुलाई", "AUG": "अगस्त",
      "SEP": "सितंबर", "OCT": "अक्टूबर", "NOV": "नवंबर", "DEC": "दिसंबर",
      "Jan": "जनवरी", "Feb": "फरवरी", "Mar": "मार्च", "Apr": "अप्रैल",
      "May": "मई", "Jun": "जून", "Jul": "जुलाई", "Aug": "अगस्त",
      "Sep": "सितंबर", "Oct": "अक्टूबर", "Nov": "नवंबर", "Dec": "दिसंबर",
      "Recent": "हाल ही में", "recent": "हाल ही में"
    },
    gu: {
      "JAN": "જાન્યુ", "FEB": "ફેબ્રુ", "MAR": "માર્ચ", "APR": "એપ્રિલ",
      "MAY": "મે", "JUN": "જૂન", "JUL": "જુલાઈ", "AUG": "ઓગસ્ટ",
      "SEP": "સપ્ટે", "OCT": "ઓક્ટો", "NOV": "નવે", "DEC": "ડિસે",
      "Jan": "જાન્યુ", "Feb": "ફેબ્રુ", "Mar": "માર્ચ", "Apr": "એપ્રિલ",
      "May": "મે", "Jun": "જૂન", "Jul": "જુલાઈ", "Aug": "ઓગસ્ટ",
      "Sep": "સપ્ટે", "Oct": "ઓક્ટો", "Nov": "નવે", "Dec": "ડિસે",
      "Recent": "તાજેતરનું", "recent": "તાજેતરનું"
    },
    pa: {
      "JAN": "ਜਨ", "FEB": "ਫ਼ਰ", "MAR": "ਮਾਰਚ", "APR": "ਅਪ੍ਰੈਲ",
      "MAY": "ਮਈ", "JUN": "ਜੂਨ", "JUL": "ਜੁਲਾਈ", "AUG": "ਅਗਸਤ",
      "SEP": "ਸਤੰ", "OCT": "ਅਕਤੂ", "NOV": "ਨਵੰ", "DEC": "ਦਸੰ",
      "Jan": "ਜਨ", "Feb": "ਫ਼ਰ", "Mar": "ਮਾਰਚ", "Apr": "ਅਪ੍ਰੈਲ",
      "May": "ਮਈ", "Jun": "ਜੂਨ", "Jul": "ਜੁਲਾਈ", "Aug": "ਅਗਸਤ",
      "Sep": "ਸਤੰ", "Oct": "ਅਕਤੂ", "Nov": "ਨਵੰ", "Dec": "ਦਸੰ",
      "Recent": "ਹਾਲ ਹੀ ਵਿੱਚ", "recent": "ਹਾਲ ਹੀ ਵਿੱਚ"
    },
    ur: {
      "JAN": "جنوری", "FEB": "فروری", "MAR": "مارچ", "APR": "اپریل",
      "MAY": "مئی", "JUN": "جون", "JUL": "جولائی", "AUG": "اگست",
      "SEP": "ستمبر", "OCT": "اکتوبر", "NOV": "نومبر", "DEC": "دسمبر",
      "Jan": "جنوری", "Feb": "فروری", "Mar": "مار्च", "Apr": "اپریل",
      "May": "مئی", "Jun": "جون", "Jul": "جولائی", "Aug": "اگست",
      "Sep": "ستمبر", "Oct": "اکتوبر", "Nov": "نومبر", "Dec": "دسمبر",
      "Recent": "حالیہ", "recent": "حالیہ"
    },
    so: {
      "JAN": "Jan", "FEB": "Feb", "MAR": "Mar", "APR": "Abr",
      "MAY": "May", "JUN": "Jun", "JUL": "Lul", "AUG": "Ogs",
      "SEP": "Seb", "OCT": "Okt", "NOV": "Nof", "DEC": "Dis",
      "Jan": "Jan", "Feb": "Feb", "Mar": "Mar", "Apr": "Abr",
      "May": "May", "Jun": "Jun", "Jul": "Lul", "Aug": "Ogs",
      "Sep": "Seb", "Oct": "Okt", "Nov": "Nof", "Dec": "Dis",
      "Recent": "Dhowaan", "recent": "dhowaan"
    },
    ar: {
      "JAN": "يناير", "FEB": "فبراير", "MAR": "مارس", "APR": "أبريل",
      "MAY": "مايو", "JUN": "يونيو", "JUL": "يوليو", "AUG": "أغسطس",
      "SEP": "سبتمبر", "OCT": "أكتوبر", "NOV": "نوفمبر", "DEC": "ديسمبر",
      "Jan": "يناير", "Feb": "فبراير", "Mar": "مارس", "Apr": "أبريل",
      "May": "مايو", "Jun": "يونيو", "Jul": "يوليو", "Aug": "أغسطس",
      "Sep": "سبتمبر", "Oct": "أكتوبر", "Nov": "نوفمبر", "Dec": "ديسمبر",
      "Recent": "حديثاً", "recent": "حديثاً"
    },
    bn: {
      "JAN": "জানু", "FEB": "ফেব্রু", "MAR": "মার্চ", "APR": "এপ্রিল",
      "MAY": "মে", "JUN": "জুন", "JUL": "জুলাই", "AUG": "আগস্ট",
      "SEP": "সেপ্টে", "OCT": "অক্টো", "NOV": "নভে", "DEC": "ডিসে",
      "Jan": "জানু", "Feb": "ফেব্রু", "Mar": "মার্চ", "Apr": "এপ্রিল",
      "May": "মে", "Jun": "জুন", "Jul": "জুলাই", "Aug": "আগস্ট",
      "Sep": "সেপ্টে", "Oct": "অক্টো", "Nov": "নভে", "Dec": "ডিসে",
      "Recent": "সাম্প্রতিক", "recent": "সাম্প্রতিক"
    },
    ml: {
      "JAN": "ജനു", "FEB": "ഫെബ്രു", "MAR": "മാർച്ച്", "APR": "ഏപ്രിൽ",
      "MAY": "മേയ്", "JUN": "ജൂൺ", "JUL": "ജൂലൈ", "AUG": "ഓഗസ്റ്റ്",
      "SEP": "സെപ്റ്റം", "OCT": "ഒക്ടോ", "NOV": "നവം", "DEC": "ഡിസം",
      "Jan": "ജനു", "Feb": "ഫെബ്രു", "Mar": "മാർച്ച്", "Apr": "ഏപ്രിൽ",
      "May": "മേയ്", "Jun": "ജൂൺ", "Jul": "ജൂലൈ", "Aug": "ഓഗസ്റ്റ്",
      "Sep": "സെപ്റ്റം", "Oct": "ഒക്ടോ", "Nov": "നവം", "Dec": "ഡിസം",
      "Recent": "സമീപകാല", "recent": "സമീപകാല"
    },
    ta: {
      "JAN": "ஜன", "FEB": "பிப்", "MAR": "மார்ச்", "APR": "ஏப்",
      "MAY": "மே", "JUN": "ஜூன்", "JUL": "ஜூலை", "AUG": "ஆக",
      "SEP": "செப்", "OCT": "அக்", "NOV": "நவ", "DEC": "டிச",
      "Jan": "ஜன", "Feb": "பிப்", "Mar": "மார்ச்", "Apr": "ஏப்",
      "May": "மே", "Jun": "ஜூன்", "Jul": "ஜூலை", "Aug": "ஆக",
      "Sep": "செப்", "Oct": "அக்", "Nov": "நவ", "Dec": "டிச",
      "Recent": "சமீபத்திய", "recent": "சமீபத்திய"
    }
  };

  const map = MONTH_MAPS[lang];
  if (map) {
    let res = clean;
    for (const [enM, targetM] of Object.entries(map)) {
      res = res.replace(new RegExp(`\\b${enM}\\b`, 'g'), targetM);
    }
    return res;
  }
  return clean;
}

/**
 * Translates notification titles into the user's selected language across all 11 languages.
 */
export function translateNotificationTitle(title: string | undefined | null, lang: string = "en"): string {
  if (!title) return "";
  if (lang === "en") return title;

  // 1. Grant Approved: e.g. 'OTHERS Grant Approved (£10,000.00)'
  const mGrantAppr = title.match(/^(.*?)\s+Grant Approved\s+(\(.*?\))$/i);
  if (mGrantAppr) {
    const cat = translateAssistanceType(mGrantAppr[1], lang);
    const amt = mGrantAppr[2];
    switch (lang) {
      case "pl": return `Przyznano dotację: ${cat} ${amt}`;
      case "hi": return `अनुदान स्वीकृत: ${cat} ${amt}`;
      case "gu": return `અનુદાન મંજૂર: ${cat} ${amt}`;
      case "pa": return `ਗ੍ਰਾਂਟ ਮਨਜ਼ੂਰ: ${cat} ${amt}`;
      case "ur": return `گرانٹ منظور شدہ: ${cat} ${amt}`;
      case "so": return `Deeqda La Anxiyay: ${cat} ${amt}`;
      case "ar": return `تمت الموافقة على المنحة: ${cat} ${amt}`;
      case "bn": return `অনুদান অনুমোদিত: ${cat} ${amt}`;
      case "ml": return `ഗ്രാന്റ് അനുവദിച്ചു: ${cat} ${amt}`;
      case "ta": return `மானிய ஒப்புதல்: ${cat} ${amt}`;
      default: return `${cat} Grant Approved ${amt}`;
    }
  }

  // 2. Support Application Approved: e.g. 'Support Application Approved: OTHERS'
  const mAppAppr = title.match(/^Support Application Approved:\s*(.*)$/i);
  if (mAppAppr) {
    const cat = translateAssistanceType(mAppAppr[1], lang);
    switch (lang) {
      case "pl": return `Wniosek o pomoc zatwierdzony: ${cat}`;
      case "hi": return `सहायता आवेदन स्वीकृत: ${cat}`;
      case "gu": return `સહાય અરજી મંજૂર: ${cat}`;
      case "pa": return `ਸਹਾਇਤਾ ਅਰਜ਼ੀ ਮਨਜ਼ੂਰ: ${cat}`;
      case "ur": return `امداد کی درخواست منظور: ${cat}`;
      case "so": return `Codsiga Taageerada Waa La Anxiyay: ${cat}`;
      case "ar": return `تمت الموافقة على طلب الدعم: ${cat}`;
      case "bn": return `সহায়তার আবেদন অনুমোদিত: ${cat}`;
      case "ml": return `സഹായ അപേക്ഷ അംഗീകരിച്ചു: ${cat}`;
      case "ta": return `ஆதரவு விண்ணப்பம் அங்கீகரிக்கப்பட்டது: ${cat}`;
      default: return `Support Application Approved: ${cat}`;
    }
  }

  // 3. Support Application Declined
  const mAppDec = title.match(/^Support Application Declined:\s*(.*)$/i);
  if (mAppDec) {
    const cat = translateAssistanceType(mAppDec[1], lang);
    switch (lang) {
      case "pl": return `Wniosek o pomoc odrzucony: ${cat}`;
      case "hi": return `सहायता आवेदन अस्वीकृत: ${cat}`;
      case "gu": return `સહાય અરજી નકારવામાં આવી: ${cat}`;
      case "pa": return `ਸਹਾਇਤਾ ਅਰਜ਼ੀ ਰੱਦ ਕੀਤੀ: ${cat}`;
      case "ur": return `امداد کی درخواست مسترد: ${cat}`;
      case "so": return `Codsiga Taageerada Waa La Diiday: ${cat}`;
      case "ar": return `تم رفض طلب الدعم: ${cat}`;
      case "bn": return `সহায়তার আবেদন প্রত্যাখ্যান: ${cat}`;
      case "ml": return `സഹായ അപേക്ഷ നിരസിച്ചു: ${cat}`;
      case "ta": return `ஆதரவு விண்ணப்பம் நிராகரிக்கப்பட்டது: ${cat}`;
      default: return `Support Application Declined: ${cat}`;
    }
  }

  // 4. Support Application: X – Under Assessment
  const mAppAssess = title.match(/^Support Application:\s*(.*?)\s*[–-]\s*Under Assessment$/i);
  if (mAppAssess) {
    const cat = translateAssistanceType(mAppAssess[1], lang);
    switch (lang) {
      case "pl": return `Wniosek o pomoc: ${cat} – W trakcie oceny`;
      case "hi": return `सहायता आवेदन: ${cat} – मूल्यांकन के अधीन`;
      case "gu": return `સહાય અરજી: ${cat} – મૂલ્યાંકન હેઠળ`;
      case "pa": return `ਸਹਾਇਤਾ ਅਰਜ਼ੀ: ${cat} – ਮੁਲਾਂਕਣ ਅਧੀਨ`;
      case "ur": return `امداد کی درخواست: ${cat} – زیر جائزہ`;
      case "so": return `Codsiga Taageerada: ${cat} – Qiimayn ku socoto`;
      case "ar": return `طلب دعم: ${cat} – قيد التقييم`;
      case "bn": return `সহায়তার আবেদন: ${cat} – মূল্যায়নাধীন`;
      case "ml": return `സഹായ അപേക്ഷ: ${cat} – പരിശോധനയിൽ`;
      case "ta": return `ஆதரவு விண்ணப்பம்: ${cat} – மதிப்பீட்டில் உள்ளது`;
      default: return `Support Application: ${cat} – Under Assessment`;
    }
  }

  // 5. Caseworker Message from X
  const mMsg = title.match(/^Caseworker Message from\s*(.*)$/i);
  if (mMsg) {
    const adv = translateAdvocateName(mMsg[1], lang);
    switch (lang) {
      case "pl": return `Wiadomość od opiekuna: ${adv}`;
      case "hi": return `केसवर्कर का संदेश: ${adv}`;
      case "gu": return `કેસવર્કર તરફથી સંદેશ: ${adv}`;
      case "pa": return `ਕੇਸਵਰਕਰ ਵੱਲੋਂ ਸੁਨੇਹਾ: ${adv}`;
      case "ur": return `کیس ورکر کا پیغام: ${adv}`;
      case "so": return `Farriinta Shaqaalaha Daryeelka: ${adv}`;
      case "ar": return `رسالة من أخصائي الرعاية: ${adv}`;
      case "bn": return `কেসওয়ার্কারের বার্তা: ${adv}`;
      case "ml": return `കേസ് വർക്കറുടെ സന്ദേശം: ${adv}`;
      case "ta": return `வழக்கு பணியாளரின் செய்தி: ${adv}`;
      default: return `Caseworker Message from ${adv}`;
    }
  }

  // 6. Allocation Cancelled
  const mAllocCancel = title.match(/^(.*?)\s+Allocation Cancelled\s+(\(.*?\))$/i);
  if (mAllocCancel) {
    const cat = translateAssistanceType(mAllocCancel[1], lang);
    const amt = mAllocCancel[2];
    switch (lang) {
      case "pl": return `Przydział anulowany: ${cat} ${amt}`;
      case "hi": return `आवंटन रद्द: ${cat} ${amt}`;
      case "gu": return `ફાળવણી રદ: ${cat} ${amt}`;
      case "pa": return `ਅਲਾਟਮੈਂਟ ਰੱਦ: ${cat} ${amt}`;
      case "ur": return `مختص رقم منسوخ: ${cat} ${amt}`;
      case "so": return `Qoondada La Joojiyay: ${cat} ${amt}`;
      case "ar": return `تم إلغاء التخصيص: ${cat} ${amt}`;
      case "bn": return `বরাদ্দ বাতিল: ${cat} ${amt}`;
      case "ml": return `വിഹിതം റദ്ദാക്കി: ${cat} ${amt}`;
      case "ta": return `ஒதுக்கீடு ரத்து: ${cat} ${amt}`;
      default: return `${cat} Allocation Cancelled ${amt}`;
    }
  }

  // 7. Allocation Declined
  const mAllocDec = title.match(/^(.*?)\s+Allocation Declined\s+(\(.*?\))$/i);
  if (mAllocDec) {
    const cat = translateAssistanceType(mAllocDec[1], lang);
    const amt = mAllocDec[2];
    switch (lang) {
      case "pl": return `Przydział odrzucony: ${cat} ${amt}`;
      case "hi": return `आवंटन अस्वीकृत: ${cat} ${amt}`;
      case "gu": return `ફાળવણી નકારવામાં આવી: ${cat} ${amt}`;
      case "pa": return `ਅਲਾਟਮੈਂਟ ਅਸਵੀਕਾਰ: ${cat} ${amt}`;
      case "ur": return `مختص رقم مسترد: ${cat} ${amt}`;
      case "so": return `Qoondada La Diiday: ${cat} ${amt}`;
      case "ar": return `تم رفض التخصيص: ${cat} ${amt}`;
      case "bn": return `বরাদ্দ প্রত্যাখ্যান: ${cat} ${amt}`;
      case "ml": return `വിഹിതം നിരസിച്ചു: ${cat} ${amt}`;
      case "ta": return `ஒதுக்கீடு நிராகரிக்கப்பட்டது: ${cat} ${amt}`;
      default: return `${cat} Allocation Declined ${amt}`;
    }
  }

  // 8. Assistance Distributed
  const mDist = title.match(/^(.*?)\s+Assistance Distributed\s+(\(.*?\))$/i);
  if (mDist) {
    const cat = translateAssistanceType(mDist[1], lang);
    const amt = mDist[2];
    switch (lang) {
      case "pl": return `Wypłacono pomoc: ${cat} ${amt}`;
      case "hi": return `सहायता वितरित: ${cat} ${amt}`;
      case "gu": return `સહાય વિતરિત: ${cat} ${amt}`;
      case "pa": return `ਸਹਾਇਤਾ ਵੰਡੀ ਗਈ: ${cat} ${amt}`;
      case "ur": return `امداد تقسیم کر دی گئی: ${cat} ${amt}`;
      case "so": return `Taageerada La Qaybiyay: ${cat} ${amt}`;
      case "ar": return `تم صرف المساعدة: ${cat} ${amt}`;
      case "bn": return `সহায়তা বিতরণ করা হয়েছে: ${cat} ${amt}`;
      case "ml": return `സഹായം വിതരണം ചെയ്തു: ${cat} ${amt}`;
      case "ta": return `உதவி வழங்கப்பட்டது: ${cat} ${amt}`;
      default: return `${cat} Assistance Distributed ${amt}`;
    }
  }

  return title;
}

/**
 * Translates notification bodies into the user's selected language across all 11 languages.
 */
export function translateNotificationBody(body: string | undefined | null, lang: string = "en"): string {
  if (!body) return "";
  if (lang === "en") return body;

  // 1. Trustee relief grant (Ref: ...) of £... has been approved by the Trustees Relief Committee.
  const mGrant = body.match(/^Trustee relief grant \(Ref:\s*(.*?)\)\s+of\s+(.*?)\s+has been approved by the Trustees Relief Committee\.$/i);
  if (mGrant) {
    const ref = mGrant[1];
    const amt = mGrant[2];
    switch (lang) {
      case "pl": return `Dotacja pomocowa powierników (Nr ref: ${ref}) na kwotę ${amt} została zatwierdzona przez Komitet Pomocowy Powierników.`;
      case "hi": return `ट्रस्टी राहत अनुदान (संदर्भ: ${ref}) राशि ${amt} को ट्रस्टी राहत समिति द्वारा अनुमोदित किया गया है।`;
      case "gu": return `ટ્રસ્ટી રાહત અનુદાન (સંદર્ભ: ${ref}) ${amt} ની રકમ ટ્રસ્ટી રાહત સમિતિ દ્વારા મંજૂર કરવામાં આવી છે.`;
      case "pa": return `ਟਰੱਸਟੀ ਰਾਹਤ ਗ੍ਰਾਂਟ (ਹਵਾਲਾ: ${ref}) ਦੀ ਰਕਮ ${amt} ਟਰੱਸਟੀ ਰਾਹਤ ਕਮੇਟੀ ਦੁਆਰਾ ਮਨਜ਼ੂਰ ਕੀਤੀ ਗਈ ਹੈ।`;
      case "ur": return `ٹرسٹی ریلیف گرانٹ (حوالہ: ${ref}) رقم ${amt} کی ٹرسٹی ریلیف کمیٹی نے منظوری دے دی ہے۔`;
      case "so": return `Deeqda gargaarka ee wakiilada (Tixraac: ${ref}) ee ${amt} waxaa ansixiyay Guddiga Gargaarka Wakiilada.`;
      case "ar": return `تمت الموافقة على منحة إغاثة مجلس الأمناء (مرجع: ${ref}) بمبلغ ${amt} من قبل لجنة إغاثة الأمناء.`;
      case "bn": return `ট্রাস্টি রিলিফ অনুদান (রেফারেন্স: ${ref}) ${amt} ট্রাস্টি রিলিফ কমিটি দ্বারা অনুমোদিত হয়েছে।`;
      case "ml": return `ട്രസ്റ്റി റിലീഫ് ഗ്രാന്റ് (റഫറൻസ്: ${ref}) തുക ${amt} ട്രസ്റ്റി റിലീഫ് കമ്മിറ്റി അംഗീകരിച്ചു.`;
      case "ta": return `அறங்காவலர் நிவாரண மானியம் (குறிப்பு: ${ref}) ${amt} அறங்காவலர் நிவாரணக் குழுவால் அங்கீகரிக்கப்பட்டது.`;
    }
  }

  // 2. Your emergency support application for ... has been approved by the casework team.
  const mApp = body.match(/^Your emergency support application for\s+(.*?)\s+has been approved by the casework team\.$/i);
  if (mApp) {
    const cat = translateAssistanceType(mApp[1], lang);
    switch (lang) {
      case "pl": return `Twój awaryjny wniosek o pomoc (${cat}) został zatwierdzony przez zespół doradców.`;
      case "hi": return `${cat} के लिए आपका आपातकालीन सहायता आवेदन केसवर्क टीम द्वारा अनुमोदित कर दिया गया है।`;
      case "gu": return `${cat} માટેની તમારી કટોકટી સહાય અરજી કેસવર્ક ટીમ દ્વારા મંજૂર કરવામાં આવી છે.`;
      case "pa": return `${cat} ਲਈ ਤੁਹਾਡੀ ਐਮਰਜੈਂਸੀ ਸਹਾਇਤਾ ਅਰਜ਼ੀ ਕੇਸਵਰਕ ਟੀਮ ਦੁਆਰਾ ਮਨਜ਼ੂਰ ਕਰ ਲਈ ਗਈ ਹੈ।`;
      case "ur": return `${cat} کے لیے آپ کی ہنگامی امداد کی درخواست کیس ورک ٹیم نے منظور کر لی ہے۔`;
      case "so": return `Codsigaaga gargaarka degdegga ah ee ${cat} waxaa ansixiyay kooxda daryeelka.`;
      case "ar": return `تمت الموافقة على طلب الدعم الطارئ الخاص بك لـ ${cat} من قبل فريق الرعاية.`;
      case "bn": return `${cat}-এর জন্য আপনার জরুরি সহায়তার আবেদন কেসওয়ার্ক দল দ্বারা অনুমোদিত হয়েছে।`;
      case "ml": return `${cat}-നുള്ള നിങ്ങളുടെ അടിയന്തര സഹായ അപേക്ഷ കേസ് വർക്ക് ടീം അംഗീകരിച്ചു.`;
      case "ta": return `${cat}-க்கான உங்கள் அவசர ஆதரவு விண்ணப்பம் வழக்கு குழுவால் அங்கீகரிக்கப்பட்டது.`;
    }
  }

  // 3. Your application for ... (Urgency: ...) is under active assessment by your assigned advocate.
  const mAssess = body.match(/^Your application for\s+(.*?)\s+\(Urgency:\s*(.*?)\)\s+is under active assessment by your assigned advocate\.$/i);
  if (mAssess) {
    const cat = translateAssistanceType(mAssess[1], lang);
    const urg = translateStatus(mAssess[2], lang);
    switch (lang) {
      case "pl": return `Twój wniosek o ${cat} (Pilność: ${urg}) jest w trakcie aktywnej oceny przez przydzielonego doradcę.`;
      case "hi": return `${cat} (प्राथमिकता: ${urg}) के लिए आपका आवेदन आपके नियुक्त सलाहकार द्वारा समीक्षाधीन है।`;
      case "gu": return `${cat} (તાકીદ: ${urg}) માટેની તમારી અરજી તમારા સોંપેલ એડવોકેટ દ્વારા સક્રિય મૂલ્યાંકન હેઠળ છે.`;
      case "pa": return `${cat} (ਜ਼ਰੂਰੀਤਾ: ${urg}) ਲਈ ਤੁਹਾਡੀ ਅਰਜ਼ੀ ਤੁਹਾਡੇ ਨਿਯੁਕਤ ਵਕੀਲ ਦੁਆਰਾ ਸਮੀਖਿਆ ਅਧੀਨ ਹੈ।`;
      case "ur": return `${cat} (فوری ضرورت: ${urg}) کے لیے آپ کی درخواست آپ کے مقرر کردہ ایڈوکیٹ کے زیر جائزہ ہے۔`;
      case "so": return `Codsigaaga ku saabsan ${cat} (Degdegga: ${urg}) waxaa si firfircoon u qiimeynaya qareenkaaga.`;
      case "ar": return `طلبك لـ ${cat} (درجة الإلحاح: ${urg}) قيد التقييم النشط من قبل المستشار المعين لك.`;
      case "bn": return `${cat} (জরুরিতা: ${urg})-এর জন্য আপনার আবেদনটি আপনার নিযুক্ত পরামর্শকের সক্রিয় মূল্যায়নাধীন।`;
      case "ml": return `${cat} (പ്രാധാന്യം: ${urg})-നായുള്ള നിങ്ങളുടെ അപേക്ഷ അഡ്വക്കേറ്റിന്റെ പരിശോധനയിലാണ്.`;
      case "ta": return `${cat} (அவசரம்: ${urg})-க்கான உங்கள் விண்ணப்பம் உங்கள் ஆலோசகரின் நேரடி மதிப்பீட்டில் உள்ளது.`;
    }
  }

  // 4. Your assistance request has been approved.
  if (body.trim().toLowerCase() === "your assistance request has been approved." || body.trim().toLowerCase() === "your assistance request has been approved") {
    switch (lang) {
      case "pl": return "Twój wniosek o pomoc został zatwierdzony.";
      case "hi": return "आपके सहायता अनुरोध को स्वीकृति मिल गई है।";
      case "gu": return "તમારી સહાય વિનંતી મંજૂર કરવામાં આવી છે.";
      case "pa": return "ਤੁਹਾਡੀ ਸਹਾਇਤਾ ਬੇਨਤੀ ਮਨਜ਼ੂਰ ਕਰ ਲਈ ਗਈ ਹੈ।";
      case "ur": return "آپ کی امداد کی درخواست منظور کر لی گئی ہے۔";
      case "so": return "Codsigaaga gargaarka waa la ansixiyay.";
      case "ar": return "تمت الموافقة على طلب المساعدة الخاص بك.";
      case "bn": return "আপনার সহায়তার অনুরোধ অনুমোদিত হয়েছে।";
      case "ml": return "നിങ്ങളുടെ സഹായ അഭ്യർത്ഥന അംഗീകരിച്ചു.";
      case "ta": return "உங்கள் உதவி கோரிக்கை அங்கீகரிக்கப்பட்டது.";
    }
  }

  // 5. Your support application for X was reviewed and declined at this time.
  const mDec = body.match(/^Your support application for\s+(.*?)\s+was reviewed and declined at this time\.$/i);
  if (mDec) {
    const cat = translateAssistanceType(mDec[1], lang);
    switch (lang) {
      case "pl": return `Twój wniosek o pomoc (${cat}) został rozpatrzony i odrzucony.`;
      case "hi": return `${cat} के लिए आपके सहायता आवेदन की समीक्षा की गई और अस्वीकार कर दिया गया।`;
      case "gu": return `${cat} માટેની તમારી સહાય અરજીની સમીક્ષા કરવામાં આવી અને નકારવામાં આવી.`;
      case "pa": return `${cat} ਲਈ ਤੁਹਾਡੀ ਸਹਾਇਤਾ ਅਰਜ਼ੀ ਦੀ ਸਮੀਖਿਆ ਕੀਤੀ ਗਈ ਅਤੇ ਰੱਦ ਕਰ ਦਿੱਤੀ ਗਈ।`;
      case "ur": return `${cat} کے لیے آپ کی امدادی درخواست کا جائزہ لیا گیا اور مسترد کر دیا گیا۔`;
      case "so": return `Codsigaaga taageerada ee ${cat} dib ayaa loo eegay waana la diiday waqtigan.`;
      case "ar": return `تمت مراجعة طلب الدعم الخاص بك لـ ${cat} وتم رفضه في هذا الوقت.`;
      case "bn": return `${cat}-এর জন্য আপনার সহায়তার আবেদন পর্যালোচনা করে প্রত্যাখ্যান করা হয়েছে।`;
      case "ml": return `${cat}-നായുള്ള നിങ്ങളുടെ സഹായ അപേക്ഷ പരിശോധിക്കുകയും നിരസിക്കുകയും ചെയ്തു.`;
      case "ta": return `${cat}-க்கான உங்கள் ஆதரவு விண்ணப்பம் பரிசீலிக்கப்பட்டு நிராகரிக்கப்பட்டது.`;
    }
  }

  // 6. Trustee relief allocation (Ref: X) of Y has been cancelled by administration.
  const mCancel = body.match(/^Trustee relief allocation \(Ref:\s*(.*?)\)\s+of\s+(.*?)\s+has been cancelled by administration\.$/i);
  if (mCancel) {
    const ref = mCancel[1];
    const amt = mCancel[2];
    switch (lang) {
      case "pl": return `Przydział pomocy powierników (Nr ref: ${ref}) na kwotę ${amt} został anulowany przez administrację.`;
      case "hi": return `प्रशासन द्वारा ट्रस्टी राहत आवंटन (संदर्भ: ${ref}) राशि ${amt} को रद्द कर दिया गया है।`;
      case "gu": return `વહીવટીતંત્ર દ્વારા ટ્રસ્ટી રાહત ફાળવણી (સંદર્ભ: ${ref}) ${amt} રદ કરવામાં આવી છે.`;
      case "pa": return `ਪ੍ਰਸ਼ਾਸਨ ਦੁਆਰਾ ਟਰੱਸਟੀ ਰਾਹਤ ਅਲਾਟਮੈਂਟ (ਹਵਾਲਾ: ${ref}) ਦੀ ਰਕਮ ${amt} ਰੱਦ ਕਰ ਦਿੱਤੀ ਗਈ ਹੈ।`;
      case "ur": return `انتظامیہ کی طرف سے ٹرسٹی ریلیف مختص (حوالہ: ${ref}) رقم ${amt} کو منسوخ کر دیا گیا ہے۔`;
      case "so": return `Qoondada gargaarka wakiilada (Tixraac: ${ref}) ee ${amt} waxaa baabi'iyay maamulka.`;
      case "ar": return `تم إلغاء مخصصات إغاثة الأمناء (مرجع: ${ref}) بمبلغ ${amt} من قبل الإدارة.`;
      case "bn": return `প্রশাসন কর্তৃক ট্রাস্টি রিলিফ বরাদ্দ (রেফারেন্স: ${ref}) ${amt} বাতিল করা হয়েছে।`;
      case "ml": return `അഡ്മിനിസ്ട്രേഷൻ ട്രസ്റ്റി റിലീഫ് വിഹിതം (റഫറൻസ്: ${ref}) തുക ${amt} റദ്ദാക്കി.`;
      case "ta": return `நிர்வாகத்தால் அறங்காவலர் நிவாரண ஒதுக்கீடு (குறிப்பு: ${ref}) ${amt} ரத்து செய்யப்பட்டது.`;
    }
  }

  // 7. Official disbursement of X for Y via Z has been completed.
  const mDist = body.match(/^Official disbursement of\s+(.*?)\s+for\s+(.*?)\s+via\s+(.*?)\s+has been completed\.$/i);
  if (mDist) {
    const amt = mDist[1];
    const purp = translateDefaultPurpose(mDist[2], lang);
    const meth = translateDisbursementMethod(mDist[3], lang);
    switch (lang) {
      case "pl": return `Oficjalna wypłata kwoty ${amt} na ${purp} za pośrednictwem ${meth} została zrealizowana.`;
      case "hi": return `${meth} के माध्यम से ${purp} के लिए ${amt} का आधिकारिक संवितरण पूरा हो गया है।`;
      case "gu": return `${meth} દ્વારા ${purp} માટે ${amt} નું સત્તાવાર વિતરણ પૂર્ણ થયું છે.`;
      case "pa": return `${meth} ਰਾਹੀਂ ${purp} ਲਈ ${amt} ਦੀ ਅਧਿਕਾਰਤ ਵੰਡ ਪੂਰੀ ਹੋ ਗਈ ਹੈ।`;
      case "ur": return `${meth} کے ذریعے ${purp} کے لیے ${amt} کی سرکاری ادائیگی مکمل ہو گئی ہے۔`;
      case "so": return `Bixinta rasmiga ah ee ${amt} oo loogu talagalay ${purp} iyada oo loo marayo ${meth} waa la dhamaystiray.`;
      case "ar": return `اكتمل الصرف الرسمي لمبلغ ${amt} لـ ${purp} عبر ${meth}.`;
      case "bn": return `${meth}-এর মাধ্যমে ${purp}-এর জন্য ${amt}-এর আনুষ্ঠানিক বিতরণ সম্পন্ন হয়েছে।`;
      case "ml": return `${meth} വഴി ${purp}-നായുള്ള ${amt} ഔദ്യോഗിക വിതരണം പൂർത്തിയായി.`;
      case "ta": return `${meth} வழியாக ${purp}-க்கான ${amt} அதிகாரப்பூர்வ விநியோகம் நிறைவடைந்தது.`;
    }
  }

  return body;
}
