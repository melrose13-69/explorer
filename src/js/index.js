// Main js file
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#import-js-files

// // global variables
const body = document.body;
const asideWrapper = body.querySelector( '#aside_wrapper' );
const mainWrapper = body.querySelector( '#main_wrapper' );
const controlsWrapper = body.querySelector( 'controls-wrapper' );
const controlButtons = controlsWrapper.querySelectorAll( 'control-btn' );
const modalBlock = body.querySelector( 'ex-modal' );
const headerSearch = document.querySelector('.header__inner-search');
// const contextMenu = document.querySelector( 'context-menu' );
//
// // data[]

const list = [
    {
        id: 1,
        type: 'folder',
        title: 'exportportal',
        block: false,
        password: '',
        created: '18.08.2021',
        children: [
            {
                id: 11,
                type: 'file',
                title: 'index.html',
                block: false,
                password: '',
                created: '18.08.2021'
            },
            {
                id: 12,
                type: 'folder',
                title: 'css',
                block: false,
                password: '',
                created: '18.08.2021',
                children: [
                    {
                        id: 121,
                        type: 'file',
                        title: 'style.css',
                        block: false,
                        password: '',
                        created: '18.08.2021'
                    }
                ]
            },
            {
                id: 13,
                type: 'folder',
                title: 'js',
                block: false,
                password: '',
                created: '18.08.2021',
                children: [
                    {
                        id: 131,
                        type: 'file',
                        title: 'app.js',
                        block: false,
                        password: '',
                        created: '18.08.2021'
                    },
                    {
                        id: 132,
                        type: 'folder',
                        title: 'vendors',
                        block: false,
                        password: '',
                        created: '18.08.2021',
                        children: [
                            {
                                id: 1321,
                                type: 'file',
                                title: 'swiper.js',
                                block: false,
                                password: '',
                                created: '18.08.2021'
                            },
                            {
                                id: 1322,
                                type: 'file',
                                title: 'fancybox.js',
                                block: false,
                                password: '',
                                created: '18.08.2021'
                            }
                        ]
                    }
                ]
            },
            {
                id: 14,
                type: 'folder',
                title: 'fonts',
                block: false,
                password: '',
                created: '18.08.2021',
                children: [
                    {
                        id: 141,
                        type: 'file',
                        title: 'icomoon.svg',
                        block: false,
                        password: '',
                        created: '18.08.2021'
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        type: 'file',
        title: 'file19',
        block: false,
        password: '',
        created: '18.08.2021'
    },
    {
        id: 3,
        type: 'folder',
        title: 'folder22',
        block: false,
        password: '',
        created: '18.08.2021',
        children: []
    }
];
// helpers
const getDate = () => {
    const date = new Date();
    return date.toLocaleDateString();
};
const _ = ( tag ) => document.createElement( tag );
const attr = ( elem, attr1, attr2 ) => {
    if ( attr2 ) {
        elem.setAttribute( attr1, attr2 );
        return;
    }
    return elem.getAttribute( attr1 );
};
const siblings = ( parent ) => {
    const siblings = [];
    parent.childNodes.forEach( elem => {
        siblings.push( elem );
    } );
    if ( siblings.length > 0 ) return siblings;

    return false;
};

const getTargetElement = () => document.querySelector( 'ex-line.target' );
const getParentIdFromElement = ( id ) => id.substring( 0, id.length - 1 );
const removeAsideTarget = () => asideWrapper.querySelectorAll( 'ex-name' ).forEach( elem => elem.classList.remove( 'target' ) );

const notification = ( type, text, timeout = 3000 ) => {
    const noty = document.querySelector( '.noty' );
    const notyText = noty.querySelector( '.noty__text' );
    const duration = noty.querySelector( '.duration' );
    notyText.innerText = text;
    noty.classList.add( type, 'show' );

    const nativeSetTimeout = window.setTimeout;

    window.bindTimeout = function ( listener, interval ) {
        function setTimeout( code, delay ) {
            let elapsed = 0,
                h;

            h = window.setInterval( function () {
                elapsed += interval;
                if ( elapsed < delay ) {
                    listener( ((delay - elapsed) * 100) / delay );
                } else {
                    window.clearInterval( h );
                }
            }, interval );
            return nativeSetTimeout( code, delay );
        }

        window.setTimeout = setTimeout;
        setTimeout._native = nativeSetTimeout;
    };
    window.bindTimeout( function ( t ) {duration.style.width = `${ t }%`;}, 100 );
    window.setTimeout( function () {noty.classList.remove( type, 'show' );}, 3000 );
};
// functions
// modalBlock

const modalHandle = ( action, id, name, name2 ) => {
    const modalText = modalBlock.querySelector( '#ex-text' );
    const inputWrapper = modalBlock.querySelector('.modal__inner-input');
    const modalInput = inputWrapper.querySelector( '#first-input' );
    const errorMessage = inputWrapper.querySelector( '.error-message' );
    const hiddenInput = inputWrapper.querySelector( '#second-input' );
    const saveButton = modalBlock.querySelector( '#ex-save' );
    const isFile = action === 'file';
    const isFolder = action === 'folder';
    const isEdit = action === 'edit';
    const isBlock = action === 'block';
    const isUnblock = action === 'unblock';
    const isDelete = action === 'delete';
    const isProtected = action === 'protected';

    const open = () => {

        if ( isFolder || isFile ) {
            modalText.innerText = `Write a new ${ action } name`;
            modalInput.placeholder = `${action} name`
        }

        if ( isBlock ) {
            modalText.innerText = `Enter the password to block the ${ name.toUpperCase() }`;
            attr( modalInput, 'type', 'password' );
            attr( hiddenInput, 'type', 'password' );
        }

        if ( isUnblock ) {
            modalText.innerText = `Enter the password to unblock the ${ name.toUpperCase() }`;
            attr( modalInput, 'type', 'password' );
            attr( hiddenInput, 'type', 'hidden' );
        }

        if ( isDelete ) {
            modalText.innerText = `Do you really wont to delete ${ name.toUpperCase() } ?`;
            attr( modalInput, 'type', 'hidden' );
            attr( hiddenInput, 'type', 'hidden' );
        }
        if ( isEdit ) {
            modalText.innerText = `Do you really wont to rename ${ name.toUpperCase() } ?`;
            modalInput.type = 'text';
            modalInput.value = name;
        }

        if ( isProtected ) {
            modalText.innerText = `${ name.toUpperCase() } is protected, please enter the password`;
            attr( modalInput, 'type', 'password' );
            attr( hiddenInput, 'type', 'hidden' );
        }

        modalBlock.classList.add( 'active' );
        body.classList.add( 'lock' );
        errorMessage.innerHTML = '';
        attr( saveButton, 'data-type', action );
        attr( saveButton, 'data-id', id );
    };

    const validateModal = () => {
            const valFirst = modalInput.value;
            const valSecond = hiddenInput.value;


            const isError = ( input, text ) => {
                errorMessage.innerHTML = text;
                if(input === 'all') {
                    modalInput.classList.add('error');
                    hiddenInput.classList.add('error')
                    return
                }
                input.classList.add( 'error' );
            };

            if ( valFirst.length < 3 && !isBlock && !isUnblock ) {
                isError( modalInput, 'Name must contain 3 or more letters' );
                return false;
            }

            if ( isFile ) {

                if ( valFirst.indexOf( '.' ) < 0 ) {
                    isError( modalInput, 'The file must have an extension (.*)' );
                    return false;
                }
                if ( valFirst[ valFirst.indexOf( '.' ) + 1 ] ) {
                    notification('success', 'File added successfully')
                    return true;
                } else {
                    isError( modalInput, 'The file must have an extension (.*)' );
                    return false;
                }
            }
            if ( isEdit ) {
                const currentElement = returnElemArrayIndexOfTheElementId( id ).element;
                if ( currentElement.type === 'file' ) {
                    if ( valFirst.indexOf( '.' ) < 0 ) {
                        isError( modalInput, 'The file must have an extension (.*)' );
                        return false;
                    } else {
                        if ( valFirst[ valFirst.indexOf( '.' ) + 1 ] !== undefined ) {
                            notification('success', 'File renamed successfully')
                            return true;
                        } else {
                            isError( modalInput, 'The file must have an extension (.*)' );
                            return false;
                        }
                    }
                }
                if ( currentElement.type === 'folder' ) {
                    if ( valFirst.indexOf( '.' ) <= 0 ) {
                        notification('success', 'Folder renamed successfully')
                        return true;
                    } else {
                        isError( modalInput, 'The folder name must not contain special characters' );
                        return false;
                    }
                }

            }
            if ( isFolder ) {
                if ( valFirst.indexOf( '.' ) <= 0 ) {
                    notification('success', 'Folder added  hastily ')
                    return true;
                } else {
                    isError( modalInput, 'The folder name must not contain special characters' );
                    return false;
                }
            }

            if ( isUnblock ) {
                const currentFolder = returnElemArrayIndexOfTheElementId( id ).element;
                const pass = currentFolder.password;
                if ( pass === name ) {
                    notification('success', 'The folder is unlocked')
                    return true;
                } else {
                    isError( modalInput, 'Wrong password' );
                    return false;
                }
            }

            if ( isBlock ) {
                if(name.length === 0 || name2.length === 0) {
                    isError( 'all', 'Passwords must match' );
                    return false
                }
                if ( name === name2 ) {
                    notification('success', 'The folder is locked')
                    return true;
                } else {
                    isError( 'all', 'Passwords must match' );
                    return false;
                }
            }

        };
// close modalBlock
    const close = () => {
        modalBlock.classList.remove( 'active' );
        modalInput.classList.remove( 'error' );
        hiddenInput.classList.remove( 'error' );
        body.classList.remove( 'active' );
        attr( saveButton, 'type', 'hidden' );
        attr( saveButton, 'type', 'text' );
        body.classList.remove( 'lock' );
        modalInput.value = '';
        hiddenInput.value = '';
    };
    inputWrapper.querySelectorAll('input').forEach(input => {
        input.addEventListener('keyup', function () {
            const reg = /[а-яА-ЯёЁ]/g;
            if (input.value.search(reg) !==  -1) {
                input.value  =  input.value.replace(reg, '');
            }

            errorMessage.innerHTML = '';
            input.classList.remove('error')
        })
    })


    return { open, close, validateModal };
};

// disabled all control-menu
const disableAllMenu = () => controlButtons.forEach( btn => {
    attr( btn, 'data-type' ) !== 'explorer-up' && btn.classList.add( 'disabled' );
    if ( btn.classList.contains( 'password-protect' ) ) {
        btn.innerText = 'Password protect';
    }
} );
// disabled control-menu with type of ex-line
const typeOfDisableMenu = ( item, blockStatus ) => {
    const type = item.getAttribute( 'data-type' );

    controlButtons.forEach( btn => {
        if ( type === 'folder' ) {
            attr( btn, 'data-type' ) !== 'explorer-up' && btn.classList.remove( 'disabled' );
            if ( blockStatus ) {
                if ( btn.classList.contains( 'password-protect' ) ) {
                    attr( btn, 'data-type', 'unblock' );
                    btn.innerText = 'Unblock folder';
                }
            } else {
                if ( btn.classList.contains( 'password-protect' ) ) {
                    attr( btn, 'data-type', 'block' );
                    btn.innerText = 'Block folder';
                }
            }
        } else {
            if ( attr( btn, 'data-type' ) !== 'explorer-up' ) {
                if ( attr( btn, 'data-for' ) === 'all' ) {
                    btn.classList.remove( 'disabled' );
                } else {
                    btn.classList.add( 'disabled' );
                }
            }
            if ( btn.classList.contains( 'password-protect' ) ) {
                btn.innerText = 'Password protect';
            }
        }
    } );
};
// create main explorer
const createMainList = ( elemId, parent = mainWrapper, array = list ) => {
    const listFiles = [];

    if ( elemId ) array = returnElemArrayIndexOfTheElementId( elemId ).element.children;

    if ( array.length === 0 ) {
        notification( 'warning', 'This folder is empty' );
        return;
    }

    (function () {
        parent.innerHTML = '';
        array.forEach( elem => {
            listFiles.push( elem );
        } );

        listFiles.sort( ( a, b ) => {
            if ( a.title < b.title ) return -1;
            if ( a.title > b.title ) return 1;
            return 0;
        } ).sort( ( a, b ) => {
            if ( b.type === 'folder' ) return 1;
            if ( a.type === 'folder' ) return -1;
            return 0;
        } );
    })();


    listFiles.forEach( item => {
        const line = _( 'ex-line' );
        const logo = _( 'ex-logo' );
        const info = _( 'ex-info' );
        const date = _( 'ex-date' );
        const type = _( 'ex-type' );
        const block = _( 'ex-block' );

        logo.textContent = item.title;
        attr( line, 'data-id', item.id );
        attr( line, 'data-type', item.type );
        logo.classList.add( `icon-${ item.type }` );

        date.textContent = item.created;
        type.textContent = item.type;
        if ( item.type === 'folder' ) {
            block.classList.add( `icon-${ item.block === true ? 'lock' : 'lock-open' }` );
            attr( line, 'data-block', item.block );
        }

        info.append( date, type, block );

        line.appendChild( logo );
        line.appendChild( info );
        parent.appendChild( line );

        if ( attr( line, 'data-id' ).length === 1 ) {
            controlsWrapper.querySelector( '[data-type="explorer-up"' ).classList.add( 'disabled' );
        } else {
            controlsWrapper.querySelector( '[data-type="explorer-up"' ).classList.remove( 'disabled' );
        }
        disableAllMenu();
    } );
};
// create aside explorer
const createAsideList = ( parent = asideWrapper, array = list ) => {
    parent.innerHTML = '';
    const sortExplorer = ( array ) => {
        array.map( item => {
            if ( item.children && item.children.length > 1 ) {
                item.children.sort( ( a, b ) => {
                    if ( a.title < b.title ) return -1;
                    if ( a.title > b.title ) return 1;
                    return 0;
                } ).sort( ( a, b ) => {
                    if ( b.type === 'folder' ) return 1;
                    if ( a.type === 'folder' ) return -1;
                    return 0;
                } );
                sortExplorer( item.children );
            }
        } );
    };
    sortExplorer( array );

    array.forEach( item => {
        const file = _( 'ex-file' );
        const folder = _( 'ex-folder' );
        const info = _( 'ex-info' );
        const logo = _( 'ex-logo' );
        const name = _( 'ex-name' );
        const content = _( 'ex-content' );

        name.textContent = item.title;
        info.setAttribute( 'data-id', item.id );
        info.setAttribute( 'data-type', item.type );
        info.append( logo, name );

        if ( item.type === 'file' ) {
            parent.appendChild( file );
            file.appendChild( info );
        } else {
            parent.appendChild( folder );
            folder.appendChild( info );
        }

        if ( item.children ) {
            folder.appendChild( info );
            folder.appendChild( content );
            createAsideList( content, item.children );
        }
    } );
};
createMainList();
createAsideList();
// return {element, array, index} of the element id
const returnElemArrayIndexOfTheElementId = ( elemId ) => {
    let currentElement = {};

    const searchParentByElementId = ( searchElemId, currentArray ) => {
        currentArray.forEach( ( item, index, arr ) => {
            if ( item.id === +elemId ) {
                currentElement.element = item;
                currentElement.array = arr;
                currentElement.index = index;
            }
            if ( item.children && item.children.length > 0 ) {
                searchParentByElementId( +elemId, item.children );
            }
        } );
    };

    searchParentByElementId( elemId, list );

    if ( Object.keys( currentElement ).length > 0 ) {
        return currentElement;
    }
};
const returnElementsForSearch = ( val ) => {
    let elements = [];

    const searchParentByElementId = ( value, currentArray ) => {
        currentArray.forEach( item => {
            if ( item.title.indexOf(value) > -1 ) {
                elements.push(item)
            }
            if ( item.children && item.children.length > 0 ) {
                searchParentByElementId( value, item.children );
            }
        } );
    };

    searchParentByElementId( val, list );

    if ( elements.length > 0 ) {
        return elements;
    }
};

// functional for explorer
// // add new element in the list[]
const addIdToNewElement = folderFiles => {
    const allId = folderFiles.children.map( file => file.id );
    if ( allId.length === 0 ) {
        return +`${ folderFiles.id }1`;
    }
    return Math.max.apply( null, allId ) + 1;
};
// change element title
const changeElementTitle = ( itemId, newTitle ) => {
    const currentItem = returnElemArrayIndexOfTheElementId( itemId ).element;
    currentItem.title = newTitle;
    createAsideList();
};
// // add new element in list[]
const addNewElementInFolder = ( folderId, typeOfNewElem, titleOfNewElem ) => {
    const newItem = {};
    const currentFolder = returnElemArrayIndexOfTheElementId( folderId ).element;
    // required params
    newItem.id = addIdToNewElement( currentFolder );
    newItem.type = typeOfNewElem;
    newItem.title = titleOfNewElem;
    newItem.created = getDate();
    // if folder
    typeOfNewElem === 'folder' && (newItem.children = []);
    // add new file in folder
    currentFolder.children.push( newItem );
    createAsideList();
    createMainList( folderId );
};
// remove element from list[]
const removeElement = ( elemId, array = list ) => {
    const currentElement = returnElemArrayIndexOfTheElementId( elemId );
    currentElement.array.splice( currentElement.index, 1 );
    createAsideList();
    elemId.length > 1 ? createMainList( elemId.substring( 0, elemId.length - 2 ) ) : createMainList();

    modalHandle().close();
};

asideWrapper.addEventListener( 'click', e => {
    const t = e.target;
    const parent = t.parentNode;
    const content = parent.nextElementSibling;
    const logo = parent.querySelector('ex-logo');
    // open folder
    if ( t.tagName === 'EX-LOGO' && attr( parent,'data-type' ) === 'folder' ) {
        content.classList.toggle( 'open' );
        t.classList.toggle('open')
    }

    if ( t.tagName === 'EX-NAME' ) {
        const id = attr( t.parentNode, 'data-id' );
        if ( attr( t.parentNode, 'data-type' ) === 'file' ) {
            const fileName = t.innerText.trim();
            createMainList( getParentIdFromElement( id ) );
            mainWrapper.querySelectorAll('ex-line').forEach(line => {
                const text = line.querySelector('ex-logo').innerText.trim();
                if(text === fileName) line.click()
            })
        } else {
            if(!content.classList.contains('open') || !logo.classList.contains('open')) {
                content.classList.toggle( 'open' );
                logo.classList.toggle('open');
            }

            createMainList( id );
        }

        removeAsideTarget();
        t.classList.add( 'target' );
    }
} );

mainWrapper.addEventListener( 'dblclick', ( e ) => {
    const t = e.target;

    if ( t.tagName === 'EX-LINE' ) {

        removeAsideTarget();
        if ( attr( t, 'data-type' ) === 'folder' ) {
            if ( attr( t, 'data-block' ) ) {
                const name = getTargetElement().querySelector( 'ex-logo' ).innerText;
                modalHandle( 'protected', attr( t, 'data-id' ), name ).open();
            } else {
                createMainList( attr( t, 'data-id' ) );
                if ( !t.classList.contains( 'target' ) ) {
                    disableAllMenu();
                }
            }
        }
    }
} );
mainWrapper.addEventListener( 'click', ( e ) => {
    const t = e.target;

    if ( t.tagName === 'EX-LINE' ) {
        const childs = siblings( t.parentNode );
        const blockStatus = attr( t, 'data-block' );
        childs.forEach( el => el.classList.remove( 'target' ) );
        t.classList.add( 'target' );
        typeOfDisableMenu( t, blockStatus );
    }
} );

controlsWrapper.addEventListener( 'click', ( e ) => {
    const t = e.target;
    const isExplorerUpButton = attr( t, 'data-type' ) === 'explorer-up';
    const isDisabled = t.classList.contains( 'disabled' )
    if ( isExplorerUpButton && !isDisabled ) {
        let id = attr( mainWrapper.children[ 0 ], 'data-id' );
        id = id.substring( 0, id.length - 2 );
        createMainList( id );
        removeAsideTarget();
        return;
    }

    if ( !isExplorerUpButton && !isDisabled ) {
        const activeElement = getTargetElement();
        const targetName = activeElement.querySelector( 'ex-logo' ).innerText;
        modalHandle( attr( t, 'data-type' ), attr( activeElement, 'data-id' ), targetName ).open();
    }
} );

modalBlock.querySelector( '#ex-cancel' ).addEventListener( 'click', modalHandle().close );

modalBlock.querySelector( '#ex-save' ).addEventListener( 'click', function () {
    const type = attr( this, 'data-type' );
    const id = attr( this, 'data-id' );
    if ( type === 'file' || type === 'folder' ) {
        if ( modalHandle( type ).validateModal() ) {
            const name = modalBlock.querySelector( '#first-input' ).value;

            addNewElementInFolder( id, type, name );
            modalHandle().close();
        }
    }
    if ( type === 'delete' ) {
        removeElement( id );
    }

    if ( type === 'edit' ) {
        if ( modalHandle( type, id ).validateModal() ) {
            const name = modalBlock.querySelector( '#first-input' ).value;
            changeElementTitle( id, name );
            createMainList( getParentIdFromElement( id ) );
            modalHandle().close();
        }
    }
    if ( type === 'block' ) {
        const pass1 = modalBlock.querySelector( '#first-input' ).value;
        const pass2 = modalBlock.querySelector( '#second-input' ).value;
        if ( modalHandle( type, '', pass1, pass2 ).validateModal() ) {
            const currentElement = returnElemArrayIndexOfTheElementId( id ).element;

            currentElement.password = pass1;
            currentElement.block = true;
            createMainList( getParentIdFromElement( id ) );
            modalHandle().close();
        }
    }

    if ( type === 'unblock' ) {
        const pass1 = modalBlock.querySelector( '#first-input' ).value;

        if ( modalHandle( type, id, pass1 ).validateModal() ) {
            const currentElement = returnElemArrayIndexOfTheElementId( id ).element;

            currentElement.password = '';
            currentElement.block = false;
            createMainList( getParentIdFromElement( id ) );
            modalHandle().close();
        }
    }

    if ( type === 'protected' ) {
        const pass1 = modalBlock.querySelector( '#first-input' ).value;
        if ( modalHandle( type, id, pass1 ).validateModal() ) {
            modalHandle().close();
            createMainList( id );
        }
    }
} );

headerSearch.querySelector('button').addEventListener('click', function () {
    const input = headerSearch.querySelector('#search');
    const searchElements = returnElementsForSearch(input.value);
    createMainList(null, mainWrapper, searchElements)
});

document.addEventListener('keyup', (e) => {
   if(modalBlock.classList.contains('active')) {
       if(e.key === 'Escape') {
           modalHandle().close()
       }
       if(e.key === 'Enter') {
           modalBlock.querySelector('#ex-save').click()
       }
   }
});

document.addEventListener('click', (e) => {
    const t = e.target;
    const isModal = modalBlock.contains(t) || t === modalBlock;
    const modalIsActive = modalBlock.classList.contains('active');
    const isBtn = t.tagName === 'CONTROL-BTN';

    if(modalIsActive && !isModal && !isBtn) {
        modalHandle().close()
    }
})