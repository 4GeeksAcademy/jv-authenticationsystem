const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: JSON.parse( localStorage.getItem("user") )|| null,
			token: localStorage.getItem("token") || "", 
			apiUrl: process.env.REACT_APP_BACKEND_URL

			
		},
		actions: {

		registrationUser: async (newUser) => {
			const store = getStore(); 
			const response = await fetch(`https://silver-eureka-r4gqjg69gpjrc5pqq-3001.app.github.dev/api/register`, {
				method:"POST", 
				body: JSON.stringify(newUser), 
				headers: {
					"Content-Type": "application/json", 
				}
			});

			let data = await response.json(); 

			if(response.status != 200){
				alert(data.error)
				return(false); 
			}

			setStore({...store, nameUserCreated: data.email});
			return(true);
	 	
      },

	  	login: async (newUser) => {
			const store = getStore();
			const response = await fetch( store.apiUrl  + "/login", {
				method: "POST",
				body: JSON.stringify(newUser), 
				headers:{
					"content-Type": "application/json", 
				},
			})

			const data = await response.json(); 
			if (response.ok){
				setStore({user:data.user , token:data.token})
				localStorage.setItem("token" , data.token)
				localStorage.setItem("user", JSON.stringify(data.user))
				return {"sucess": true}; 
			}
			else{
				return {'success': false, 'error' : data.error }
			}

		}, 

		getPrivate: async() => {
			const store= getStore();
			const response = await fetch(store.apiUrl + "/private")
			const data = await response.json()
			setStore({user: data.user})
		}


		}
		
		
			
		}
	};


export default getState;
