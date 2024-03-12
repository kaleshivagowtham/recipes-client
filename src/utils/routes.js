
export const routes = {

    // baseUrl : 'http://localhost:5000',
    baseUrl : process.env.NEXT_PUBLIC_BASE_URL,
    api : {

        login : '/login',

        signup : '/signup',

        upload : '/upload',

        recipes : '/recipes',

        search : '/search',

        files : '/getrecords',

        getallrecipe : '/getallrecipe',

        getrecipe : '/getrecipe',

        addRecipe : '/addrecipe',

        updaterecipe : '/updaterecipe',

        checkLiked : '/checkliked',

        changeLiked : '/changeliked',

        getwriterrecipes : '/getwriterrecipes',

        checkIfWriter : '/checkifwriter',

        getAuthor : '/getAuthor',

        
    }
}