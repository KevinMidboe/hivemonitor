export interface IGatewayTelemetry {
	gateway_name: string;
	t: string;
	temperature: string;
	battery_level?: string;
	last_sync?: string;
}

export interface IHiveTelemetry {
	hive_name: string;
	t: string;
	temperature: string;
	humidity?: string;
	pressure?: string;
	weight?: string;
	battery_level?: string;
}
