search_btn = document.getElementById('search_btn')
const search = document.getElementById("search_q");
var pkmns_name_ls = new Array();
search_term = ''
let list_term_count = 0
let ls = {}





async function fillList()
{   
    for(i = 1; i  < 906; i++)
    {
        url = `https://pokeapi.co/api/v2/pokemon/${i}`
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        var data = await response.json();
        
       
        pkmns_name_ls.push(data)
        
    }
}
fillList()

async function getResponseList(param) {
    
    
    
    
    url = `https://pokeapi.co/api/v2/pokemon/${param}`
	const response = await fetch(
		url,
		{
			method: 'GET',
		}
	);
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);

	}
	const data = await response.json();
    
    let pokemon_name = data.name
    delete ls[pokemon_name]
    proper_name = pokemon_name.charAt(0).toUpperCase() + pokemon_name.slice(1)
    
    
    document.getElementById('upa').href=`https://pokemondb.net/pokedex/${pokemon_name}`
    document.getElementById('update_name').innerHTML = proper_name
    document.getElementById('update_img').setAttribute('src',data.sprites.other['official-artwork'].front_default)
    search_term = ''
    search.value = ''
    var ul = document.getElementById("potential_names");
    
    var child = ul.lastElementChild; 
        while (child) {
            ul.removeChild(child);
            child = ul.lastElementChild;
        }
    
    list_term_count -=1
    
    
}




async function getResponse() {
    
    
    search_item = document.getElementById('search_q').value
    
    url = `https://pokeapi.co/api/v2/pokemon/${search_item}`
	const response = await fetch(
		url,
		{
			method: 'GET',
		}
	);
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);

	}
	const data = await response.json();
    
    let pokemon_name = data.name
    delete ls[pokemon_name]
    proper_name = pokemon_name.charAt(0).toUpperCase() + pokemon_name.slice(1)
    
    
    document.getElementById('upa').href=`https://pokemondb.net/pokedex/${pokemon_name}`
    document.getElementById('update_name').innerHTML = proper_name
    document.getElementById('update_img').setAttribute('src',data.sprites.other['official-artwork'].front_default)
    search_term = ''
    search.value = ''
    var ul = document.getElementById("potential_names");
    
    var child = ul.lastElementChild; 
        while (child) {
            ul.removeChild(child);
            child = ul.lastElementChild;
        }
    
    list_term_count -=1
    
    
}

search_btn.addEventListener('click',() => getResponse())



search.addEventListener("keyup", function (e) {
   
    if(e.key.length === 1 && e.key.match(/[a-z]/i)){
        search_term += e.key
    }
    else if(e.key == 'Backspace')
    {
        search_term = search_term.slice(0, -1);
    }
   
   

    //For name in pokemon
    //  if name.length is >= search term.length:
    //      while char in search_term == char in name
    //          if(not isMatch):
    //              isMatch = false
    //              break
    //          isMatch = true
    //      if(ismatch):
    //          if the name is already in ls:
    //              do nothing
    //          else:
    //              add to dict
    //      
    //Display dict, top 7 matches      
    for(let i = 0; i < 905; i++)
    
    {
        
        
        if(pkmns_name_ls[i] == undefined)
        {
            continue
        }
        var pkemon_name = pkmns_name_ls[i].name
        var pkemon_type = pkmns_name_ls[i].types['0'].type.name
        
        let isMatch = false
        
        
        
        if(pkemon_name.length >= search_term.length)
        {
            
            for(let i = 0; i < search_term.length;i++)
            {
                if(pkemon_name[i] == search_term[i])
                {
                    isMatch = true
                }
                else{
                    isMatch = false
                    break
                } 
            }

            const hasKey = pkemon_name in ls
            if(isMatch)
            {
                
                if(!hasKey)
                {

                    ls[pkemon_name] = pkemon_name
                    
                   
                    var ul, li;

                    ul = document.getElementById("potential_names");
                    var li = document.createElement("li");
                    li.setAttribute('id',`list_term_${ls[pkemon_name]}`)
        
                    li.setAttribute(`class`,`list-group-item ${pkemon_type}`)
                    
                   
                    var a = document.createElement('a')
                    a.setAttribute('href','#')
                    a.setAttribute('class','list_term_link')
                    pkemon_name = pkemon_name.charAt(0).toUpperCase() + pkemon_name.slice(1)
                    a.innerHTML = pkemon_name
                    li.appendChild(a)
                    ul.appendChild(li);
                    list_term_count +=1
                }
                else{
                    
                }
            }
            else{
                if(hasKey)
                {
                    var ul = document.getElementById("potential_names");
                    var li = document.getElementById(`list_term_${ls[pkemon_name]}`)
                    if(!li)
                    {
                        continue
                    }
                    ul.removeChild(li)
                    delete ls[pkemon_name]
                    list_term_count -=1
                }
            }
        }

       
       
        

       
    }

    
    

});

window.onclick = function(event) {
    var target = event.target;
    if(target.className == 'list_term_link')
    {
        var new_name = target.innerHTML
        new_name = new_name.toLowerCase()
        getResponseList(new_name)
    }
    
    
}




