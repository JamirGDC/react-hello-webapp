const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			contacts: [],
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			createContact: async (full_name, email, agenda_slug, address, phone) => {
				const store = getStore();

				try {
					const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({ full_name, email, agenda_slug, address, phone })
					});

					const data = await response.json();

					setStore({ ...store, contact: data });


				} catch (error) {
					console.error("Error during create", error);
				}
			},

			getContacts: async () => {
				const store = getStore();

				try {
					const response = await fetch(` https://playground.4geeks.com/apis/fake/contact/agenda/jamirG`);
					const data = await response.json();
					setStore({ ...store, contacts: data });
				} catch (error) {
					console.error("Error during get", error);
				}
			},

			deleteContact: async (key) => {
				const store = getStore();

				try {
					const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${key}`, {
						method: 'DELETE',
					});

					console.log(response);
				} catch (error) {
					console.error("Error during delete", error);
				}
			},

			editContact: async (id, full_name, agenda_slug, email, address, phone) => {
				const store = getStore();

				try {
					const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({ full_name, email, agenda_slug, address, phone })
					});

					console.log(response);
				} catch (error) {
					console.error("Error during delete", error);
				}
			}
		}
	};
};

export default getState;
