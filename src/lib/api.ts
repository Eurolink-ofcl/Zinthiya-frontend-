/**
 * The Zinthiya Trust - Centralized API Service
 * Handles direct communication between Frontend and NestJS / PostgreSQL Backend.
 * Standard for both React Web and Flutter / Mobile applications.
 */

export const API_BASE_URL =
  (typeof window !== "undefined" && (window as any).__API_BASE_URL__) ||
  (import.meta.env && import.meta.env.VITE_API_BASE_URL) ||
  "http://localhost:5000/api";

export interface DonorUser {
  id: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
  address?: string;
  townCity?: string;
  postcode?: string;
  country?: string;
  emailNewsletter?: boolean;
  smsAlerts?: boolean;
  role: "DONOR" | "BENEFICIARY" | "STAFF" | "ADMIN";
  staffRole?: string;
  department?: string;
  jobTitle?: string;
  permissions?: string[];
  generalConsent: boolean;
  donationTier: string;
  totalDonated: string | number;
  createdAt: string;
  updatedAt?: string;
}

export interface AuthTokens {
  accessToken: string;
  tokenType: string;
  expiresIn: string;
}

export interface AuthResponse {
  statusCode: number;
  message: string;
  data: {
    user: DonorUser;
    auth: AuthTokens;
  };
}

export interface RegisterDonorPayload {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  address?: string;
  generalConsent?: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface DonorStats {
  totalDonated: number | string;
  donationTier: string;
  totalDonations: number;
  lastDonationDate: string | null;
}

export interface DonationRecord {
  id: string;
  amount: number | string;
  currency: string;
  type: "ONE_OFF" | "RECURRING" | string;
  status: "COMPLETED" | "PENDING" | "FAILED" | "REFUNDED" | string;
  giftAid: boolean;
  paymentMethod?: string;
  reference?: string;
  notes?: string | null;
  donorName?: string | null;
  donorEmail?: string | null;
  userId?: string | null;
  campaignId?: string | null;
  createdAt: string;
  campaign?: {
    id: string;
    title: string;
    targetAmount?: number | string;
    raisedAmount?: number | string;
  } | null;
  user?: {
    id: string;
    fullName: string;
    email: string;
    phoneNumber?: string;
    townCity?: string;
    postcode?: string;
    country?: string;
    donationTier?: string;
  } | null;
}

export interface CampaignRecord {
  id: string;
  campaignCode?: string | null;
  campaignType?: "INTERNAL" | "EXTERNAL";
  title: string;
  description: string;
  targetAmount: number | string;
  raisedAmount: number | string;
  imageUrl?: string | null;
  campaignUrl?: string | null;
  status?: "DRAFT" | "ACTIVE" | "COMPLETED" | "ARCHIVED";
  active: boolean;
  startDate?: string | null;
  endDate?: string | null;
  archived?: boolean;
  corporateSponsor?: string | null;
  fundraisingPageId?: string | null;
  fundraisingPageName?: string | null;
  fundraisingPageUrl?: string | null;
  fundraiserName?: string | null;
  fundraiserEmail?: string | null;
  fundraiserContactConsent?: boolean;
  customReference?: string | null;
  charityReferences?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  utmContent?: string | null;
  utmTerm?: string | null;
  createdAt: string;
  updatedAt?: string;
  progressPercentage?: number;
  donationsCount?: number;
  donations?: any[];
  _count?: {
    donations: number;
  };
}

export interface CreateDonationPayload {
  amount: number;
  type?: "ONE_OFF" | "RECURRING";
  giftAid?: boolean;
  campaignId?: string;
  paymentMethod?: string;
  frequency?: string;
  reference?: string;
  donorName?: string;
  donorEmail?: string;
  notes?: string;
}

export interface AdminMetrics {
  totalDonations: number;
  totalDonationsCount: number;
  totalDonors: number;
  activeCampaigns: number;
  totalBeneficiaries: number;
  pendingRequestsCount: number;
}

export interface AdminActivity {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: string;
  status: string;
}

export interface AdminCampaignPerformance {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  raisedAmount: number;
  percentage: number;
  active: boolean;
  imageUrl?: string;
  donorsCount: number;
}

export interface AdminDonationTrend {
  oneOffTotal: number;
  recurringTotal: number;
  giftAidEligibleTotal: number;
  giftAidTaxReclaimed: number;
  totalCompletedGifts: number;
}

export interface AdminBeneficiaryRequest {
  id: string;
  fullName: string;
  serviceType: string;
  urgency: string;
  status: string;
  notes?: string;
  reviewNotes?: string;
  householdSize: number;
  contactPhone?: string;
  assignedWorker?: string;
  resolutionDate?: string;
  createdAt: string;
}

export interface BeneficiaryDocument {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  status: "VERIFIED" | "PENDING" | "RESTRICTED" | string;
  metadata?: any;
}

export interface BeneficiaryCommunication {
  id: string;
  date: string;
  staff: string;
  method: string;
  notes: string;
  nextStep?: string;
}

export interface BeneficiaryRecord {
  id: string;
  email: string;
  fullName: string;
  phoneNumber?: string | null;
  address?: string | null;
  townCity?: string | null;
  postcode?: string | null;
  country?: string | null;
  active: boolean;
  assignedAdvocate?: string | null;
  emergencyContact?: string | null;
  documents?: BeneficiaryDocument[] | null;
  communicationLogs?: BeneficiaryCommunication[] | null;
  createdAt: string;
  updatedAt: string;
  beneficiaryRequests: AdminBeneficiaryRequest[];
}

export interface SupportCategoryRecord {
  id: string;
  name: string;
  description?: string | null;
  targetFundingRequired: number;
  status: string;
  totalAllocated: number;
  totalDistributed: number;
  remainingFundingNeeded: number;
  allocationCount: number;
  allocatedPercent: number;
  distributedPercent: number;
  createdAt: string;
  updatedAt: string;
}

export type AllocationStatus = "ALLOCATED" | "DISTRIBUTED" | "CANCELLED";

export type AssistanceType =
  | "FOOD"
  | "MEDICAL"
  | "EDUCATION"
  | "ENERGY_FUEL"
  | "HOUSING_RENT"
  | "DOMESTIC_ABUSE_REFUGE"
  | "CLOTHING_BEDDING"
  | "OTHER";

export interface AssistanceAllocationRecord {
  id: string;
  reference: string;
  userId?: string | null;
  beneficiaryName: string;
  beneficiaryEmail?: string | null;
  beneficiaryPhone?: string | null;
  requestId?: string | null;
  campaignId?: string | null;
  categoryId?: string | null;
  categoryName?: string | null;
  fundSource: string;
  assistanceType: AssistanceType;
  description?: string | null;
  allocatedAmount: number | string;
  distributedAmount: number | string;
  status: AllocationStatus;
  allocationDate: string;
  distributionDate?: string | null;
  paymentMethod?: string | null;
  disbursedBy?: string | null;
  disbursementNotes?: string | null;
  receiptReference?: string | null;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    fullName: string;
    email: string;
    phoneNumber?: string | null;
    assignedAdvocate?: string | null;
  } | null;
  campaign?: {
    id: string;
    title: string;
    raisedAmount?: number | string;
    targetAmount?: number | string;
  } | null;
  request?: {
    id: string;
    serviceType: string;
    urgency: string;
    status: string;
  } | null;
}

export interface AllocationsResponse {
  financialSummary: {
    totalDonationsReceived: number;
    totalAllocated: number;
    totalDistributed: number;
    pendingDistribution: number;
    netAvailableReserves: number;
    totalFundingRequired?: number;
  };
  campaigns: { id: string; title: string; raisedAmount: number | string }[];
  categories?: SupportCategoryRecord[];
  allocations: AssistanceAllocationRecord[];
}

export interface CrmDonor {
  id: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
  address?: string;
  townCity?: string;
  postcode?: string;
  country?: string;
  generalConsent: boolean;
  emailNewsletter: boolean;
  smsAlerts: boolean;
  postalUpdates: boolean;
  totalDonated: number;
  donationTier: "SUPPORTER" | "BRONZE" | "SILVER" | "GOLD" | "PLATINUM";
  lastDonationDate: string | null;
  createdAt: string;
  updatedAt: string;
  donations: (DonationRecord & {
    campaign?: { id: string; title: string };
  })[];
  donationsCount: number;
}

export interface AdminDashboardPayload {
  statusCode: number;
  timestamp: string;
  metrics: AdminMetrics;
  sections: {
    recentDonations: (DonationRecord & {
      donor: { fullName: string; email: string; tier: string };
      campaign: { id?: string; title: string };
    })[];
    recentActivities: AdminActivity[];
    campaignPerformance: AdminCampaignPerformance[];
    donationTrends: AdminDonationTrend;
    pendingBeneficiaryRequests: AdminBeneficiaryRequest[];
  };
}

export interface StaffMember {
  id: string;
  email: string;
  fullName: string;
  phoneNumber?: string | null;
  role: "ADMIN" | "STAFF";
  staffRole?: string;
  department?: string;
  jobTitle?: string;
  active: boolean;
  permissions?: string[];
  lastLoginAt?: string | null;
  createdAt: string;
  updatedAt?: string;
}

export interface StaffStats {
  totalStaff: number;
  activeStaff: number;
  inactiveStaff: number;
  adminCount: number;
  caseworkerCount: number;
}

export interface StaffResponse {
  staff: StaffMember[];
  stats: StaffStats;
}

export interface AuditLogRecord {
  id: string;
  action: string;
  entityType: string;
  entityId?: string | null;
  entityTitle?: string | null;
  details?: string | null;
  actorName: string;
  actorEmail: string;
  actorRole: string;
  actorId?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  diff?: any;
  createdAt: string;
}

export interface AuditLogsResponse {
  logs: AuditLogRecord[];
  totalCount: number;
  recentTodayCount: number;
}

export interface RolesPermissionsResponse {
  roles: any[];
  permissions: any[];
}

export interface ReportFilters {
  period?: string;
  startDate?: string;
  endDate?: string;
  campaignId?: string;
  donationType?: string;
}

export interface ReportsData {
  summary?: any;
  timeline?: any[];
  campaigns?: any[];
  topDonors?: any[];
  donationTypeSplit?: any;
  beneficiarySupport?: any;
  fundDistribution?: any;
  [key: string]: any;
}

class ApiService {
  private getHeaders(includeAuth = true): HeadersInit {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (includeAuth) {
      const token = this.getToken();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  // Token & Session Storage
  getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("zinthiya_token");
  }

  setSession(user: DonorUser, token: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem("zinthiya_token", token);
    localStorage.setItem("zinthiya_donor", JSON.stringify(user));
  }

  getCurrentDonor(): DonorUser | null {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem("zinthiya_donor");
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  getUser(): DonorUser | null {
    return this.getCurrentDonor();
  }

  clearSession(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem("zinthiya_token");
    localStorage.removeItem("zinthiya_donor");
  }

  // API Requests
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const res = await fetch(url, options);

    let data: any;
    try {
      data = await res.json();
    } catch {
      data = { message: res.statusText };
    }

    if (!res.ok) {
      const message = Array.isArray(data?.message)
        ? data.message.join(", ")
        : data?.message || `Request failed with status ${res.status}`;
      const err = new Error(message) as any;
      err.status = res.status;
      err.data = data;
      throw err;
    }

    return data as T;
  }

  // --- Auth & Donor Registration ---
  async registerDonor(payload: RegisterDonorPayload): Promise<AuthResponse> {
    return this.request<AuthResponse>("/auth/register", {
      method: "POST",
      headers: this.getHeaders(false),
      body: JSON.stringify(payload),
    });
  }

  async registerBeneficiary(payload: any): Promise<{ statusCode: number; message: string; data: any }> {
    return this.request<{ statusCode: number; message: string; data: any }>("/auth/beneficiary/register", {
      method: "POST",
      headers: this.getHeaders(false),
      body: JSON.stringify(payload),
    });
  }

  async login(payload: LoginPayload): Promise<AuthResponse> {
    return this.request<AuthResponse>("/auth/login", {
      method: "POST",
      headers: this.getHeaders(false),
      body: JSON.stringify(payload),
    });
  }

  async getMe(): Promise<{ statusCode: number; data: { user: DonorUser } }> {
    return this.request<{ statusCode: number; data: { user: DonorUser } }>("/auth/me", {
      method: "GET",
      headers: this.getHeaders(true),
    });
  }

  async getBeneficiaryPortalData(): Promise<{
    user: any;
    requests: any[];
    allocations: any[];
    categories?: any[];
    stats: {
      totalAllocated: number;
      totalDistributed: number;
      requestCount: number;
    };
  }> {
    const token = typeof window !== "undefined" ? localStorage.getItem("beneficiary_token") : null;
    const res = await this.request<any>("/auth/beneficiary/portal-data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    return res.data;
  }

  async submitBeneficiarySupportRequest(payload: {
    serviceType: string;
    notes?: string;
    urgency?: string;
  }): Promise<any> {
    const token = typeof window !== "undefined" ? localStorage.getItem("beneficiary_token") : null;
    return this.request<any>("/auth/beneficiary/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
    });
  }

  async checkEmail(email: string): Promise<{ available: boolean; email: string }> {
    return this.request<{ available: boolean; email: string }>(
      `/auth/check-email?email=${encodeURIComponent(email)}`,
      {
        method: "GET",
        headers: this.getHeaders(false),
      }
    );
  }

  // --- Donor Portal Endpoints ---
  async getDonorStats(): Promise<DonorStats> {
    return this.request<DonorStats>("/donors/stats", {
      method: "GET",
      headers: this.getHeaders(true),
    });
  }

  async getDonorProfile(): Promise<DonorUser> {
    return this.request<DonorUser>("/donors/profile", {
      method: "GET",
      headers: this.getHeaders(true),
    });
  }

  async updateDonorProfile(payload: any): Promise<DonorUser> {
    return this.request<DonorUser>("/donors/profile", {
      method: "PUT",
      headers: this.getHeaders(true),
      body: JSON.stringify(payload),
    });
  }

  async getMyDonations(): Promise<DonationRecord[]> {
    return this.request<DonationRecord[]>("/donations/my", {
      method: "GET",
      headers: this.getHeaders(true),
    });
  }

  async makeDonation(payload: CreateDonationPayload): Promise<any> {
    return this.request<any>("/donations/donor", {
      method: "POST",
      headers: this.getHeaders(true),
      body: JSON.stringify(payload),
    });
  }

  // --- Campaigns ---
  async getCampaigns(): Promise<CampaignRecord[]> {
    return this.request<CampaignRecord[]>("/campaigns", {
      method: "GET",
      headers: this.getHeaders(false),
    });
  }

  // --- Admin Portal ---
  async getAdminDashboard(): Promise<AdminDashboardPayload> {
    return this.request<AdminDashboardPayload>("/admin/dashboard", {
      method: "GET",
      headers: this.getHeaders(false),
    });
  }

  async updateBeneficiaryRequestStatus(id: string, status: string, reviewNotes?: string): Promise<any> {
    return this.request<any>(`/admin/beneficiary-requests/${id}/status`, {
      method: "PATCH",
      headers: this.getHeaders(false),
      body: JSON.stringify({ status, reviewNotes }),
    });
  }

  // --- Donor Management (Donor CRM) ---
  async getAllDonorsAdmin(): Promise<CrmDonor[]> {
    return this.request<CrmDonor[]>("/admin/donors", {
      method: "GET",
      headers: this.getHeaders(false),
    });
  }

  async getDonorByIdAdmin(id: string): Promise<CrmDonor> {
    return this.request<CrmDonor>(`/admin/donors/${id}`, {
      method: "GET",
      headers: this.getHeaders(false),
    });
  }

  async createDonorAdmin(payload: any): Promise<CrmDonor> {
    return this.request<CrmDonor>("/admin/donors", {
      method: "POST",
      headers: this.getHeaders(false),
      body: JSON.stringify(payload),
    });
  }

  async updateDonorAdmin(id: string, payload: any): Promise<CrmDonor> {
    return this.request<CrmDonor>(`/admin/donors/${id}`, {
      method: "PUT",
      headers: this.getHeaders(false),
      body: JSON.stringify(payload),
    });
  }

  async recordDonorDonationAdmin(donorId: string, payload: any): Promise<any> {
    return this.request<any>(`/admin/donors/${donorId}/donations`, {
      method: "POST",
      headers: this.getHeaders(false),
      body: JSON.stringify(payload),
    });
  }

  async deleteDonorAdmin(id: string): Promise<any> {
    return this.request<any>(`/admin/donors/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(false),
    });
  }

  // --- Admin Campaign Management ---
  async getAdminCampaigns(): Promise<CampaignRecord[]> {
    return this.request<CampaignRecord[]>("/admin/campaigns", {
      method: "GET",
      headers: this.getHeaders(false),
    });
  }

  async getAdminCampaignById(id: string): Promise<CampaignRecord> {
    return this.request<CampaignRecord>(`/admin/campaigns/${id}`, {
      method: "GET",
      headers: this.getHeaders(false),
    });
  }

  async createCampaignAdmin(payload: {
    title: string;
    description: string;
    targetAmount: number | string;
    imageUrl?: string;
    campaignType?: string;
    corporateSponsor?: string;
    fundraisingPageId?: string;
    campaignCode?: string;
    startDate?: string;
    endDate?: string;
    active?: boolean;
    [key: string]: any;
  }): Promise<CampaignRecord> {
    return this.request<CampaignRecord>("/admin/campaigns", {
      method: "POST",
      headers: this.getHeaders(false),
      body: JSON.stringify(payload),
    });
  }

  async updateCampaignAdmin(id: string, payload: any): Promise<CampaignRecord> {
    return this.request<CampaignRecord>(`/admin/campaigns/${id}`, {
      method: "PUT",
      headers: this.getHeaders(false),
      body: JSON.stringify(payload),
    });
  }

  async toggleCampaignStatusAdmin(id: string, active: boolean): Promise<any> {
    return this.request<any>(`/admin/campaigns/${id}/status`, {
      method: "PATCH",
      headers: this.getHeaders(false),
      body: JSON.stringify({ active }),
    });
  }

  async archiveCampaignAdmin(id: string, archived: boolean): Promise<any> {
    return this.request<any>(`/admin/campaigns/${id}/archive`, {
      method: "PATCH",
      headers: this.getHeaders(false),
      body: JSON.stringify({ archived }),
    });
  }

  async deleteCampaignAdmin(id: string): Promise<any> {
    return this.request<any>(`/admin/campaigns/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(false),
    });
  }

  // --- Admin Donation Ledger Management ---
  async getAdminDonations(): Promise<DonationRecord[]> {
    return this.request<DonationRecord[]>("/admin/donations", {
      method: "GET",
      headers: this.getHeaders(false),
    });
  }

  async getAdminDonationById(id: string): Promise<DonationRecord> {
    return this.request<DonationRecord>(`/admin/donations/${id}`, {
      method: "GET",
      headers: this.getHeaders(false),
    });
  }

  async recordOfflineDonationAdmin(payload: {
    amount: number | string;
    userId?: string;
    donorName?: string;
    donorEmail?: string;
    donorPhone?: string;
    campaignId?: string;
    paymentMethod: string;
    type?: string;
    status?: string;
    giftAid?: boolean;
    reference?: string;
    notes?: string;
    dateReceived?: string;
  }): Promise<DonationRecord> {
    return this.request<DonationRecord>("/admin/donations", {
      method: "POST",
      headers: this.getHeaders(false),
      body: JSON.stringify(payload),
    });
  }

  async updateDonationStatusAdmin(id: string, status: string): Promise<DonationRecord> {
    return this.request<DonationRecord>(`/admin/donations/${id}/status`, {
      method: "PATCH",
      headers: this.getHeaders(false),
      body: JSON.stringify({ status }),
    });
  }

  async deleteDonationAdmin(id: string): Promise<any> {
    return this.request<any>(`/admin/donations/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(false),
    });
  }

  // --- Beneficiary Management ---
  async getAllBeneficiariesAdmin(): Promise<BeneficiaryRecord[]> {
    return this.request<BeneficiaryRecord[]>("/admin/beneficiaries", {
      method: "GET",
      headers: this.getHeaders(false),
    });
  }

  async getBeneficiaryByIdAdmin(id: string): Promise<BeneficiaryRecord> {
    return this.request<BeneficiaryRecord>(`/admin/beneficiaries/${id}`, {
      method: "GET",
      headers: this.getHeaders(false),
    });
  }

  async createBeneficiaryAdmin(payload: {
    beneficiaryType?: "INDIVIDUAL" | "ORGANISATION";
    firstName?: string;
    lastName?: string;
    dob?: string;
    gender?: string;
    preferredLanguage?: string;
    organisationName?: string;
    organisationType?: string;
    registrationNumber?: string;
    orgDescription?: string;
    contactPersonName?: string;
    contactRole?: string;
    contactEmail?: string;
    contactPhone?: string;
    beneficiaryReach?: number;
    fullName?: string;
    email?: string;
    password?: string;
    phoneNumber?: string;
    address?: string;
    townCity?: string;
    postcode?: string;
    country?: string;
    emergencyContact?: string;
    householdSize?: number;
    supportCategory?: string;
    initialService?: string;
    initialUrgency?: string;
    reasonForSupport?: string;
    assistanceDescription?: string;
    supportingDocsNote?: string;
    initialNotes?: string;
    assignedAdvocate?: string;
    createPortalAccount?: boolean;
    active?: boolean;
    documents?: any[];
    uploadedDocuments?: any[];
  }): Promise<BeneficiaryRecord> {
    return this.request<BeneficiaryRecord>("/admin/beneficiaries", {
      method: "POST",
      headers: this.getHeaders(false),
      body: JSON.stringify(payload),
    });
  }

  async updateBeneficiaryAdmin(id: string, payload: {
    fullName?: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
    townCity?: string;
    postcode?: string;
    emergencyContact?: string;
    assignedAdvocate?: string;
    active?: boolean;
  }): Promise<BeneficiaryRecord> {
    return this.request<BeneficiaryRecord>(`/admin/beneficiaries/${id}`, {
      method: "PUT",
      headers: this.getHeaders(false),
      body: JSON.stringify(payload),
    });
  }

  async toggleBeneficiaryActiveAdmin(id: string, active: boolean): Promise<BeneficiaryRecord> {
    return this.request<BeneficiaryRecord>(`/admin/beneficiaries/${id}/status`, {
      method: "PATCH",
      headers: this.getHeaders(false),
      body: JSON.stringify({ active }),
    });
  }

  async assignBeneficiaryAdvocateAdmin(id: string, assignedAdvocate: string): Promise<BeneficiaryRecord> {
    return this.request<BeneficiaryRecord>(`/admin/beneficiaries/${id}/advocate`, {
      method: "PATCH",
      headers: this.getHeaders(false),
      body: JSON.stringify({ assignedAdvocate }),
    });
  }

  async createBeneficiaryRequestAdmin(userId: string, payload: {
    serviceType: string;
    urgency?: string;
    status?: string;
    notes?: string;
    householdSize?: number;
    assignedWorker?: string;
  }): Promise<AdminBeneficiaryRequest> {
    return this.request<AdminBeneficiaryRequest>(`/admin/beneficiaries/${userId}/requests`, {
      method: "POST",
      headers: this.getHeaders(false),
      body: JSON.stringify(payload),
    });
  }

  async addBeneficiaryDocumentAdmin(id: string, payload: {
    name: string;
    type?: string;
    size?: string;
    status?: string;
    dataUrl?: string;
  }): Promise<BeneficiaryRecord> {
    return this.request<BeneficiaryRecord>(`/admin/beneficiaries/${id}/documents`, {
      method: "POST",
      headers: this.getHeaders(false),
      body: JSON.stringify(payload),
    });
  }

  async deleteBeneficiaryDocumentAdmin(id: string, docId: string): Promise<BeneficiaryRecord> {
    return this.request<BeneficiaryRecord>(`/admin/beneficiaries/${id}/documents/${docId}`, {
      method: "DELETE",
      headers: this.getHeaders(false),
    });
  }

  async addBeneficiaryCommunicationAdmin(id: string, payload: {
    date?: string;
    staff?: string;
    method?: string;
    notes: string;
    nextStep?: string;
  }): Promise<BeneficiaryRecord> {
    return this.request<BeneficiaryRecord>(`/admin/beneficiaries/${id}/communications`, {
      method: "POST",
      headers: this.getHeaders(false),
      body: JSON.stringify(payload),
    });
  }

  async deleteBeneficiaryAdmin(id: string): Promise<any> {
    return this.request<any>(`/admin/beneficiaries/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(false),
    });
  }

  // --- Fund Allocation & Assistance Management ---
  async getAllAllocationsAdmin(): Promise<AllocationsResponse> {
    return this.request<AllocationsResponse>("/admin/allocations", {
      method: "GET",
      headers: this.getHeaders(false),
    });
  }

  async getAllocationByIdAdmin(id: string): Promise<AssistanceAllocationRecord> {
    return this.request<AssistanceAllocationRecord>(`/admin/allocations/${id}`, {
      method: "GET",
      headers: this.getHeaders(false),
    });
  }

  // --- Support Categories API ---
  async getSupportCategoriesAdmin(): Promise<SupportCategoryRecord[]> {
    return this.request<SupportCategoryRecord[]>("/admin/support-categories", {
      method: "GET",
      headers: this.getHeaders(false),
    });
  }

  async createSupportCategoryAdmin(payload: {
    name: string;
    description?: string;
    targetFundingRequired: number;
    status?: string;
  }): Promise<SupportCategoryRecord> {
    return this.request<SupportCategoryRecord>("/admin/support-categories", {
      method: "POST",
      headers: this.getHeaders(false),
      body: JSON.stringify(payload),
    });
  }

  async updateSupportCategoryAdmin(
    id: string,
    payload: {
      name?: string;
      description?: string;
      targetFundingRequired?: number;
      status?: string;
    }
  ): Promise<SupportCategoryRecord> {
    return this.request<SupportCategoryRecord>(`/admin/support-categories/${id}`, {
      method: "PUT",
      headers: this.getHeaders(false),
      body: JSON.stringify(payload),
    });
  }

  async deleteSupportCategoryAdmin(id: string): Promise<any> {
    return this.request<any>(`/admin/support-categories/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(false),
    });
  }

  async createAllocationAdmin(payload: {
    userId?: string;
    beneficiaryName: string;
    beneficiaryEmail?: string;
    beneficiaryPhone?: string;
    requestId?: string;
    campaignId?: string;
    categoryId?: string;
    categoryName?: string;
    fundSource?: string;
    assistanceType: string;
    description?: string;
    allocatedAmount: number;
    distributedAmount?: number;
    status?: string;
    distributionDate?: string;
    paymentMethod?: string;
    disbursedBy?: string;
    disbursementNotes?: string;
    receiptReference?: string;
  }): Promise<AssistanceAllocationRecord> {
    return this.request<AssistanceAllocationRecord>("/admin/allocations", {
      method: "POST",
      headers: this.getHeaders(false),
      body: JSON.stringify(payload),
    });
  }

  async recordDistributionAdmin(id: string, payload: {
    distributedAmount?: number;
    distributionDate?: string;
    paymentMethod: string;
    disbursedBy: string;
    disbursementNotes?: string;
    receiptReference?: string;
  }): Promise<AssistanceAllocationRecord> {
    return this.request<AssistanceAllocationRecord>(`/admin/allocations/${id}/distribute`, {
      method: "PATCH",
      headers: this.getHeaders(false),
      body: JSON.stringify(payload),
    });
  }

  async updateAllocationAdmin(id: string, payload: any): Promise<AssistanceAllocationRecord> {
    return this.request<AssistanceAllocationRecord>(`/admin/allocations/${id}`, {
      method: "PUT",
      headers: this.getHeaders(false),
      body: JSON.stringify(payload),
    });
  }

  async cancelAllocationAdmin(id: string): Promise<AssistanceAllocationRecord> {
    return this.request<AssistanceAllocationRecord>(`/admin/allocations/${id}/cancel`, {
      method: "PATCH",
      headers: this.getHeaders(false),
    });
  }

  async deleteAllocationAdmin(id: string): Promise<any> {
    return this.request<any>(`/admin/allocations/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(false),
    });
  }


  // --- Reports & Analytics API ---
  async getReportsAdmin(filters?: ReportFilters): Promise<ReportsData> {
    const params = new URLSearchParams();
    if (filters?.period) params.append("period", filters.period);
    if (filters?.startDate) params.append("startDate", filters.startDate);
    if (filters?.endDate) params.append("endDate", filters.endDate);
    if (filters?.campaignId) params.append("campaignId", filters.campaignId);
    if (filters?.donationType) params.append("donationType", filters.donationType);
    const queryString = params.toString() ? `?${params.toString()}` : "";
    return this.request<ReportsData>(`/admin/reports${queryString}`, {
      method: "GET",
      headers: this.getHeaders(false),
    });
  }


  // --- Staff & Admin Activity Management API ---
  async getAllStaffAdmin(): Promise<StaffResponse> {
    return this.request<StaffResponse>("/admin/staff", {
      method: "GET",
      headers: this.getHeaders(false),
    });
  }

  async createStaffAdmin(payload: any): Promise<StaffMember> {
    return this.request<StaffMember>("/admin/staff", {
      method: "POST",
      headers: this.getHeaders(false),
      body: JSON.stringify(payload),
    });
  }

  async updateStaffAdmin(id: string, payload: any): Promise<StaffMember> {
    return this.request<StaffMember>(`/admin/staff/${id}`, {
      method: "PUT",
      headers: this.getHeaders(false),
      body: JSON.stringify(payload),
    });
  }

  async toggleStaffStatusAdmin(id: string, active: boolean): Promise<StaffMember> {
    return this.request<StaffMember>(`/admin/staff/${id}/status`, {
      method: "PATCH",
      headers: this.getHeaders(false),
      body: JSON.stringify({ active }),
    });
  }

  async deleteStaffAdmin(id: string): Promise<any> {
    return this.request<any>(`/admin/staff/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(false),
    });
  }

  async getAuditLogsAdmin(filters?: {
    search?: string;
    action?: string;
    entityType?: string;
    actorId?: string;
    startDate?: string;
    endDate?: string;
    limit?: number;
  }): Promise<AuditLogsResponse> {
    const params = new URLSearchParams();
    if (filters?.search) params.append("search", filters.search);
    if (filters?.action) params.append("action", filters.action);
    if (filters?.entityType) params.append("entityType", filters.entityType);
    if (filters?.actorId) params.append("actorId", filters.actorId);
    if (filters?.startDate) params.append("startDate", filters.startDate);
    if (filters?.endDate) params.append("endDate", filters.endDate);
    if (filters?.limit) params.append("limit", filters.limit.toString());
    const query = params.toString() ? `?${params.toString()}` : "";
    return this.request<AuditLogsResponse>(`/admin/audit-logs${query}`, {
      method: "GET",
      headers: this.getHeaders(false),
    });
  }

  async getRolesPermissionsAdmin(): Promise<RolesPermissionsResponse> {
    return this.request<RolesPermissionsResponse>("/admin/roles-permissions", {
      method: "GET",
      headers: this.getHeaders(false),
    });
  }


  // --- Admin Profile, Settings & Newsletter API ---
  async getAdminProfile(email?: string): Promise<any> {
    const q = email ? `?email=${encodeURIComponent(email)}` : "";
    return this.request<any>(`/admin/profile${q}`, {
      method: "GET",
      headers: this.getHeaders(false),
    });
  }

  async updateAdminProfile(payload: any): Promise<any> {
    return this.request<any>("/admin/profile", {
      method: "PUT",
      headers: this.getHeaders(false),
      body: JSON.stringify(payload),
    });
  }

  async changeAdminPassword(payload: any): Promise<any> {
    return this.request<any>("/admin/change-password", {
      method: "POST",
      headers: this.getHeaders(false),
      body: JSON.stringify(payload),
    });
  }

  async getSystemSettings(): Promise<any> {
    return this.request<any>("/admin/settings", {
      method: "GET",
      headers: this.getHeaders(false),
    });
  }

  async updateSystemSettings(payload: any): Promise<any> {
    return this.request<any>("/admin/settings", {
      method: "PUT",
      headers: this.getHeaders(false),
      body: JSON.stringify(payload),
    });
  }

  async getNewsletterAdmin(): Promise<any> {
    return this.request<any>("/admin/newsletter", {
      method: "GET",
      headers: this.getHeaders(false),
    });
  }

  async dispatchNewsletterAdmin(payload: any): Promise<any> {
    return this.request<any>("/admin/newsletter/dispatch", {
      method: "POST",
      headers: this.getHeaders(false),
      body: JSON.stringify(payload),
    });
  }

  // --- Health Check ---
  async getHealth(): Promise<{ status: string; database: string }> {
    return this.request<{ status: string; database: string }>("/health", {
      method: "GET",
      headers: this.getHeaders(false),
    });
  }
}

export const api = new ApiService();
export default api;
