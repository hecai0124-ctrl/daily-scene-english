import type { LearningProgress } from "@/lib/progress";

const syncApiUrl = process.env.NEXT_PUBLIC_SYNC_API_URL ?? "";

type SyncResponse = {
  progress?: LearningProgress;
  updatedAt?: string;
  message?: string;
};

export function isCloudSyncConfigured() {
  return syncApiUrl.length > 0;
}

export function createSyncCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 6 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
}

export async function pushCloudProgress(syncCode: string, progress: LearningProgress) {
  return requestSyncApi("POST", {
    syncCode: normalizeSyncCode(syncCode),
    progress: {
      ...progress,
      syncCode: normalizeSyncCode(syncCode),
      cloudUpdatedAt: new Date().toISOString()
    }
  });
}

export async function pullCloudProgress(syncCode: string) {
  return requestSyncApi("GET", undefined, normalizeSyncCode(syncCode));
}

export function normalizeSyncCode(syncCode: string) {
  return syncCode.trim().toUpperCase();
}

async function requestSyncApi(method: "GET" | "POST", body?: unknown, syncCode?: string) {
  if (!syncApiUrl) {
    throw new Error("云同步接口未配置");
  }

  const url = method === "GET" ? `${syncApiUrl}?syncCode=${encodeURIComponent(syncCode ?? "")}` : syncApiUrl;
  const response = await fetch(url, {
    method,
    headers: method === "POST" ? { "Content-Type": "application/json" } : undefined,
    body: method === "POST" ? JSON.stringify(body) : undefined
  });

  const data = (await response.json().catch(() => ({}))) as SyncResponse;
  if (!response.ok) {
    throw new Error(data.message ?? "同步失败");
  }

  return data;
}
