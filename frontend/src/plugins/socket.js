import { BACKEND_BASE_URL } from "@/utils/constants";
import io from "socket.io-client";

const socket = io(BACKEND_BASE_URL);

export default socket;
