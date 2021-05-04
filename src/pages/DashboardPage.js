import { Page } from '@core/Page';
import { $ } from '@core/dom';

export class DashboardPage extends Page {
	getRoot() {
		return $.create('div', 'db').html(`
			<div class="db__header">Excel Dashboard</div>

			<div class="db__new">
				<div class="db__view"><a href="#" class="db__create">New table</a></div>
			</div>

			<div class="db__table db__view">
				<div class="db__list-header">
					<span>Name</span>
					<span>Open date</span>
				</div>

				<ul class="db__list">
					<li class="db__record">
						<a href="#">Table no.1</a>
						<strong>12.05.2021</strong>
					</li>
					<li class="db__record">
						<a href="#">Table no.2</a>
						<strong>12.05.2021</strong>
					</li>
					<li class="db__record">
						<a href="#">Table no.3</a>
						<strong>12.05.2021</strong>
					</li>
				</ul>

			</div>
		`);
	}
}
