import prisma from "@/lib/client";
import { getSessionId } from "./getSessionId"
import { fetchRequests } from "./fetchRequests";

export const fetchRequestCount = async() => {
    const requests = await fetchRequests();
    return requests.length;
}