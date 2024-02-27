
export const routes = {

    // baseUrl : 'http://localhost:5000',
    baseUrl : process.env.BASE_URL,
    api : {

        login : '/login',

        signup : '/signup',

        upload : '/upload',

        recipes : '/recipes',

        search : '/search',

        files : '/getrecords',

        getallrecipe : '/getallrecipe',

        getrecipe : '/getrecipe',

        addrecipe : '/addrecipe',

        updaterecipe : '/updaterecipe',

        checkLiked : '/checkliked',

        changeLiked : '/changeliked',

        getwriterrecipes : '/getwriterrecipes',

        checkIfWriter : '/checkifwriter',

        
    }
}