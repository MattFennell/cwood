import { getBearerHeader } from '.././CredentialInputService';
import { UpdatePlayers } from '../../Models/Interfaces/UpdatePlayers';
import { SubmitResults } from '../../Models/Interfaces/SubmitResults';

export const getTransferStatus = (): Promise<boolean> => {
	return fetch('/api/weeks/transfer/open', {
		method: 'GET',
		headers: { Authorization: getBearerHeader() }
	}).then(response => {
		if (response.status === 200) {
			return response.json();
		}
	});
};

export const getNumberOfWeeks = (): Promise<number> => {
	return fetch('/api/weeks/total', {
		method: 'GET',
		headers: { Authorization: getBearerHeader() }
	}).then(response => {
		if (response.status === 200) {
			return response.json();
		}
	});
};

export const triggerWeek = (data: number): Promise<boolean> => {
	return fetch('/api/weeks/trigger', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: { Authorization: getBearerHeader(), 'Content-Type': 'application/json' }
	}).then(response => {
		if (!response.ok) {
			if (response.status === 400) {
				return response.json().then(json => {
					if (response.ok) {
						return json;
					} else {
						return Promise.reject(json.message);
					}
				});
			} else if (response.status === 500) {
				throw new Error('Internal server error');
			} else {
				throw new Error(response.status.toString());
			}
		} else if (response.status === 200) {
			return response.json();
		}
	});
};

export const setTransferMarket = (transferMarketOpen: boolean): Promise<boolean> => {
	return fetch('/api/weeks/transfer', {
		method: 'POST',
		body: JSON.stringify(transferMarketOpen),
		headers: { Authorization: getBearerHeader(), 'Content-Type': 'application/json' }
	}).then(response => {
		if (!response.ok) {
			if (response.status === 400) {
				return response.json().then(json => {
					if (response.ok) {
						return json;
					} else {
						return Promise.reject(json.message);
					}
				});
			} else if (response.status === 500) {
				throw new Error('Internal server error');
			} else {
				throw new Error(response.status.toString());
			}
		} else if (response.status === 200) {
			return response.json();
		}
	});
};

export const updateTeam = (data: UpdatePlayers): Promise<void> => {
	return fetch('/api/weeks/update', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: { Authorization: getBearerHeader(), 'Content-Type': 'application/json' }
	}).then(response => {
		if (!response.ok) {
			if (response.status === 400) {
				return response.json().then(json => {
					if (response.ok) {
						return json;
					} else {
						return Promise.reject(json.message);
					}
				});
			} else if (response.status === 500) {
				throw new Error('Internal server error');
			} else {
				throw new Error(response.status.toString());
			}
		} else if (response.status === 200) {
			return response.json();
		}
	});
};

export const submitResult = (data: SubmitResults): Promise<any> => {
	return fetch('/api/player/result/submit', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: { 'Content-Type': 'application/json', Authorization: getBearerHeader() }
	}).then(response => {
		if (!response.ok) {
			if (response.status === 400) {
				return response.json().then(json => {
					if (response.ok) {
						return json;
					} else {
						return Promise.reject(json.message);
					}
				});
			} else if (response.status === 500) {
				throw new Error('Internal server error');
			} else {
				throw new Error(response.status.toString());
			}
		} else if (response.status === 200) {
			return response.json();
		}
	});
};
