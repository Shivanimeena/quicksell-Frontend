import axios from 'axios';

const NEW_API_URL = ' https://api.quicksell.co/v1/internal/frontend-assignment ';

//https://api.quicksell.co/v1/internal/frontend-assignment 
var DATA = {};

await axios.get(NEW_API_URL)
    .then(function (response) {
        var items = response.data.tickets; // Ensure this matches the structure of the new API.
        var users = response.data.users;  // Ensure this matches the structure of the new API.

        const status = ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'].map(e => {
            return {
                title: e,
                tickets: items.filter(item => {
                    return item.status === e;
                }),
            };
        });
    
        const user = users.map(e => {
            return {
                title: e.name,
                tickets: items.filter(item => {
                    return item.userId === e.id;
                }),
            };
        });
    
        const priority = [
            { priority: 'Urgent', level: 4 }, 
            { priority: 'High', level: 3 }, 
            { priority: 'Medium', level: 2 }, 
            { priority: 'Low', level: 1 }, 
            { priority: 'No priority', level: 0 }
        ].map(e => {
            return {
                title: e.priority,
                tickets: items.filter(item => {
                    return item.priority === e.level;
                }),
            };
        });

        DATA = { status: status, user: user, priority: priority, users: users };
    }).catch(function (error) {
        console.error('Error fetching data:', error);
        DATA = { status: [], user: [], priority: [], users: [] };
    });

export default DATA;
