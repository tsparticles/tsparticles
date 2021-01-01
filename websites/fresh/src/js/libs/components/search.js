import { demoData } from '../utils/constants';

export function searchData(searchTerm) {

    const searchResultsWrapper = document.getElementById('search-results-wrapper');
    const searchResultsContainer = document.getElementById('search-results-container');
    const searchResultsPlaceholder = document.getElementById('search-results-placeholder');

    //Empty List first
    searchResultsContainer.innerHTML = '';

    console.log('SEARCH TERM: ' + searchTerm);

    //If search term, start filtering
    if (searchTerm.length > 0) {

        let searchList = demoData;

        searchResultsPlaceholder.classList.add('hidden');
        searchResultsContainer.classList.remove('hidden');

        //Filter initial array
        searchList = searchList.filter(searchList =>
            searchList.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        //Use reduce() to group results
        let groups = searchList.reduce((r, a) => {
            r[a.type] = [...r[a.type] || [], a];
            return r;
        }, {});

        //The returned object is empty
        if (Object.entries(groups).length === 0) {
            console.log('no matching results');

            //Show Placeholder
            const placeholderTemplate = `
                <div class="placeholder-wrap">
                    <div class="placeholder-content has-text-centered">
                        <img src="/img/illustrations/no-results.svg" alt="">
                        <h3>No Matching Results</h3>
                        <p>Sorry, we couldn't find any matching records. Please try different search terms.</p>
                    </div>
                </div>
            `;

            //Append group template
            searchResultsContainer.innerHTML += placeholderTemplate;
        }

        //The returned object is populated
        else {
            searchResultsPlaceholder.classList.add('is-hidden');
            searchResultsContainer.classList.remove('is-hidden');

            //Loop reduced object properties
            for (let [key, value] of Object.entries(groups)) {

                //Get property arrays
                let array = value;

                //Get result group name
                let groupName = array[0].type;

                //Prepare group UI template
                let groupTemplate = `
                    <div id="${groupName}-search-group" class="search-group">
                        <span>
                            <i class="sl icon-magnifier"></i>
                            ${groupName}
                        </span>

                        <ul></ul>
                    </div>
                `;

                //Append group template
                searchResultsContainer.innerHTML += groupTemplate;


                //Loop array of results to insert in group
                array.forEach(array => {
                    let groupId = document.getElementById(`${groupName}-search-group`);
                    let itemTemplate;

                    if (array.photoUrl === null) {
                        itemTemplate = `
                            <a class="search-result">
                                <div class="fake-avatar" style="background:${array.color}">
                                    <span>${array.title.slice(0, 1)}</span>
                                </div>
                                <div class="meta">
                                    <span>${array.title}</span>
                                    <span>${array.content}</span>
                                </div>
                            </a>
                        `;
                    }

                    else {
                        itemTemplate = `
                            <a class="search-result">
                                <img class="${array.type === 'user' ? 'avatar' : 'record'}" src="${array.photoUrl}" alt="">
                                <div class="meta">
                                    <span>${array.title}</span>
                                    <span>${array.content}</span>
                                </div>
                            </a>
                        `;
                    }


                    let list = groupId.querySelector('ul');
                    list.innerHTML += itemTemplate;
                });
            }

            searchResultsWrapper.classList.add('is-active');
        }

    }

    //Empty list
    else {
        searchResultsWrapper.classList.remove('is-active');
        searchResultsContainer.classList.add('is-hidden');
        searchResultsPlaceholder.classList.remove('is-hidden');
        searchResultsContainer.innerHTML = '';
    }

}