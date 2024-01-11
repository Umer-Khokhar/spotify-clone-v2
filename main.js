import * as hamburger from './js/hamburder.js'
import * as myfetch from './js/fetch.js'
    
    hamburger.navShow.addEventListener('click', hamburger.openNav);
    hamburger.show.addEventListener('click', hamburger.closeNav);
    

    myfetch.loadData('hindi-song')
    myfetch.loadData('english-song')

    console.log(myfetch.cardContainer)

    
      
