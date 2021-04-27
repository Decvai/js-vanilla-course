import '@/scss/index.scss';
import { Excel } from '@/components/excel/Excel';
import { Formula } from '@/components/formula/Formula';
import { Header } from '@/components/headers/Header';
import { Table } from '@/components/table/Table';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { createStore } from '@core/createStore';

const store = createStore();

const excel = new Excel('#app', {
	components: [Header, Toolbar, Formula, Table],
});
excel.render();
