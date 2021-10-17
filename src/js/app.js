
import '../css/style.css';
import './plugins';
import locations from './store/locations';
import formUI from './views/form';
import ticketsUI from './views/tickets';
import currencyUI from './views/currency';

/* locations.init().then(res => {
    console.log(res); 
    console.log(locations);
    console.log(locations.getCitiesByCountryCode('PE'));
}); */



document.addEventListener('DOMContentLoaded', () => { 
    const form = formUI.form;
    initApp();
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        onFormSubmit();
    });

    async function initApp() {
        await locations.init();
        formUI.setAutocompleteData(locations.shortCitiesList);
    }

    async function onFormSubmit() {
        const origin = locations.getCityCodeByKey(formUI.originValue);
        const destination = locations.getCityCodeByKey(formUI.destinationValue);
        const depart_date = formUI.departDateValue;
        const return_date = formUI.returnDateValue;
        const currency = currencyUI.currencyValue;
        // code, code, 2021-04, 2021-05
       
        await locations.fetchTickets({
            origin,
            destination,
            depart_date,
            return_date,
            currency,
        });

        ticketsUI.renderTickets(locations.lastSearch);
    }

    
});