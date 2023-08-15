/**
 * Purpose: Prevent staled state from persisting on page refresh
 * */
function handleManualRefresh() {
    if (performance.getEntriesByType('navigation')[0].type === 'reload') {
        if (localStorage.getItem('FutureNowState') !== null) {
            window.location.href = '/';
        }
    } else {
        console.log('This page is not reloaded');
    }
}

export default handleManualRefresh;
