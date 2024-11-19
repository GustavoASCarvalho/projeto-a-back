export interface MessageModel {
	message_id: number;
	conversation_id: number;
	chatgpt_api_key_id: number;
	message: string;
	response: string | null;
	message_timestamp: Date;
	response_timestamp: Date | null;
}
