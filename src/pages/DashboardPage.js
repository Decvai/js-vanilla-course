import { Page } from '@core/Page';
import { $ } from '@core/dom';
import { createRecordsTable } from './dashboard.funcitons';

export class DashboardPage extends Page {
	getRoot() {
		const now = Date.now().toString();

		return $.create('div', 'db').html(`
			<div class="db__header">Excel Dashboard</div>

			<div class="db__new">
				<div class="db__view">
					<a href="#excel/${now}" class="db__create">New table</a>
				</div>
			</div>

			<div class="db__table db__view">
				${createRecordsTable()}
			</div>
		`);
	}
}
