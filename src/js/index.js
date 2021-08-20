// Main js file
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#import-js-files

// // global variables
const body = document.body;
const asideWrapper = body.querySelector( '#aside_wrapper' );
const mainWrapper = body.querySelector( '#main_wrapper' );
const controlsWrapper = body.querySelector( 'controls-wrapper' );
const controlButtons = controlsWrapper.querySelectorAll( 'control-btn' );
const modalBlock = body.querySelector( 'ex-modal' );
// const contextMenu = document.querySelector( 'context-menu' );
//
// // data[]
const list = [
    {
        id: 1,
        type: 'folder',
        title: 'exportportal',
        block: true,
        created: '18.08.2021',
        children: [
            {
                id: 11,
                type: 'file',
                title: 'index.html',
                block: false,
                created: '18.08.2021'
            },
            {
                id: 12,
                type: 'folder',
                title: 'css',
                block: false,
                created: '18.08.2021',
                children: [
                    {
                        id: 121,
                        type: 'file',
                        title: 'style.css',
                        block: false,
                        created: '18.08.2021'
                    }
                ]
            },
            {
                id: 13,
                type: 'folder',
                title: 'js',
                block: false,
                created: '18.08.2021',
                children: [
                    {
                        id: 131,
                        type: 'file',
                        title: 'app.js',
                        block: false,
                        created: '18.08.2021'
                    },
                    {
                        id: 132,
                        type: 'folder',
                        title: 'vendors',
                        block: false,
                        created: '18.08.2021',
                        children: [
                            {
                                id: 1321,
                                type: 'file',
                                title: 'swiper.js',
                                block: false,
                                created: '18.08.2021'
                            },
                            {
                                id: 1322,
                                type: 'file',
                                title: 'fancybox.js',
                                block: false,
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
                block: true,
                created: '18.08.2021',
                children: [
                    {
                        id: 141,
                        type: 'file',
                        title: 'icomoon.svg',
                        block: true,
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
        created: '18.08.2021'
    }
];
// helpers
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

// functions
// modalBlock

const modalHandle = ( action, id, name ) => {
    const modalText = modalBlock.querySelector( '#ex-text' );
    const modalInput = modalBlock.querySelector( '#first-input' );
    const hiddenInput = modalBlock.querySelector( '#second-input' );
    const saveButton = modalBlock.querySelector( '#ex-save' );
    const isFile = action === 'file';
    const isFolder = action === 'folder';
    const isEdit = action === 'edit';
    const isBlock = action === 'block';
    const isDelete = action === 'delete';

    const open = () => {

        if ( isFolder || isFile ) {
            modalText.innerText = `Write a new ${action} name`;
        }

        if ( isBlock ) {
            modalText.innerText = `Do you really wont put a password ?`;
            attr( modalInput, 'type', 'password' );
            attr( hiddenInput, 'type', 'password' );
        }
        if ( isDelete ) {
            modalText.innerText = `Do you really wont to delete ?`;
            attr( modalInput, 'type', 'hidden' );
            attr( hiddenInput, 'type', 'hidden' );
        }
        if ( isEdit ) {
            modalText.innerText = `Do you really wont to rename this ${action} ?`;
            modalInput.value = name;
        }

        modalBlock.classList.add( 'active' );
        body.classList.add( 'lock' );
        attr( saveButton, 'data-type', action );
        attr( saveButton, 'data-id', id );
    };

    const validateModal = () => {
        const valFirst = modalInput.value;
        const isError = ( input ) => {input.classList.add( 'error' );};

        if ( valFirst.length === 0 ) {
            isError( modalInput );
            return false;
        }

        if ( isFile ) {
            if ( valFirst.indexOf( '.' ) < 0 ) {
                isError( modalInput );
                return false;
            }

            if ( valFirst[ valFirst.indexOf( '.' ) + 1 ] !== undefined ) {
                return true;
            } else {
                isError( modalInput );
                return false;
            }
        }

        if ( isFolder ) {
            if ( valFirst.indexOf( '.' ) > 0 ) {
                isError( modalInput );
                return false;
            } else {
                return true;
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

    return { open, close, validateModal };
};


// disabled all control-menu
const disableAllMenu = () => controlButtons.forEach( btn => {
    attr( btn, 'data-type' ) !== 'explorer-up' && btn.classList.add( 'disabled' );
} );
// disabled control-menu with type of ex-line
const typeOfDisableMenu = ( item ) => {
    const type = item.getAttribute( 'data-type' );

    controlButtons.forEach( btn => {
        if ( type === 'folder' ) {
            attr( btn, 'data-type' ) !== 'explorer-up' && btn.classList.remove( 'disabled' );
        } else {
            if ( attr( btn, 'data-type' ) !== 'explorer-up' ) {
                attr( btn, 'data-for' ) === 'all'
                    ? btn.classList.remove( 'disabled' )
                    : btn.classList.add( 'disabled' );
            }
        }
    } );
};
// create main explorer
const createMainList = ( elemId, parent = mainWrapper, array = list ) => {
    const listFiles = [];
    parent.innerHTML = '';
    if ( elemId ) array = returnElemArrayIndexOfTheElementId( elemId ).element.children;

    const pushMainList = () => {
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
    };

    pushMainList();

    listFiles.forEach( item => {
        const line = _( 'ex-line' );
        const logo = _( 'ex-logo' );
        const info = _( 'ex-info' );
        const date = _( 'ex-date' );
        const type = _( 'ex-type' );
        const block = _( 'ex-block' );

        logo.textContent = item.title;
        line.setAttribute( 'data-id', item.id );
        line.setAttribute( 'data-type', item.type );
        logo.classList.add( `icon-${item.type}` );

        date.textContent = item.created;
        type.textContent = item.type;
        block.classList.add( `icon-${item.block === true ? 'lock' : 'lock-open'}` );

        info.append( date, type, block );

        line.appendChild( logo );
        line.appendChild( info );
        parent.appendChild( line );
        console.log( attr( line, 'data-id' ).length );
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

// functional for explorer
// // add new element in the list[]
const addIdToNewElement = folderFiles => {
    const allId = folderFiles.children.map( file => file.id );
    if ( allId.length === 0 ) {
        return +`${ folderFiles.id }1`;
    }
    return Math.max.apply( null, allId ) + 1;
};
// // change element title
// const changeElementTitle = ( itemId, newTitle ) => {
//     const currentItem = returnElemArrayIndexOfTheElementId( +itemId ).element;
//     currentItem.title = newTitle;
//     createAsideList();
// };
// // add new element in list[]
const addNewElementInFolder = ( folderId, typeOfNewElem, titleOfNewElem ) => {
    const newItem = {};
    const currentFolder = returnElemArrayIndexOfTheElementId( +folderId ).element;
    // required params
    newItem.id = addIdToNewElement( currentFolder );
    newItem.type = typeOfNewElem;
    newItem.title = titleOfNewElem;
    // if folder
    typeOfNewElem === 'folder' && (newItem.children = []);
    // add new file in folder
    currentFolder.children.push( newItem );
    createAsideList();
    createMainList();
};
// // remove element from list[]
// const removeElement = ( elemId, array = list ) => {
//     const currentElement = returnElemArrayIndexOfTheElementId( +elemId );
//     currentElement.array.splice( currentElement.index, 1 );
//     createAsideList();
// };
//
// // just 1 edit-mode class on page
// const toggleEditModeClass = ( currentElem ) => {
//     asideWrapper.querySelectorAll( '.edit-mode' ).forEach( elem => {
//         elem.classList.remove( 'edit-mode' );
//     } );
//
//     if ( currentElem ) {
//         currentElem.classList.add( 'edit-mode' );
//     }
// };
// // create buttons YES and NO for delete confirmation
// const createConfirmationBlock = ( container ) => {
//     const yesBtn = document.createElement( 'button' );
//     const noBtn = document.createElement( 'button' );
//
//     yesBtn.innerText = 'yes';
//     yesBtn.classList.add( 'yes' );
//     noBtn.innerText = 'no';
//     noBtn.classList.add( 'no' );
//     container.classList.add( 'confirm' );
//     container.innerHTML = '';
//
//     container.appendChild( yesBtn );
//     container.appendChild( noBtn );
// };
// // create refactor block (rename element, add new folder or file)
// const createRefactorBlock = ( container, value, typeOfCreateElement ) => {
//     const asideWrapper = document.createElement( 'div' );
//     const input = document.createElement( 'input' );
//     const btnSave = document.createElement( 'button' );
//     const btnCancel = document.createElement( 'button' );
//
//
//     if ( typeOfCreateElement === 'rename-asideWrapper' ) {
//         input.value = value.trim();
//     }
//     if ( typeOfCreateElement === 'create-asideWrapper' ) {
//         asideWrapper.setAttribute( 'data-type', value.toLowerCase() );
//     }
//     btnSave.innerText = 'Save';
//     btnCancel.innerText = 'Cancel';
//     btnSave.classList.add( `save-${ typeOfCreateElement }-mode` );
//     btnCancel.classList.add( `cancel-mode` );
//
//     asideWrapper.classList.add( typeOfCreateElement, 'refactor-asideWrapper' );
//
//     asideWrapper.appendChild( input );
//     asideWrapper.appendChild( btnSave );
//     asideWrapper.appendChild( btnCancel );
//     container.prepend( asideWrapper );
//
//     input.focus();
// };
// // remove refactor block
// const removeRefactorBlock = () => {
//     asideWrapper.querySelectorAll( '.refactor-asideWrapper' ).forEach( block => {
//         block.parentNode.removeChild( block );
//     } );
// };
// // open context menu
// const showContextMenu = ( target, yPos, xPos, type ) => {
//     const elementParent = target.parentNode;
//     const elementId = elementParent.getAttribute( 'data-id' );
//     const fileAdding = contextMenu.querySelector( 'file' );
//     const folderAdding = contextMenu.querySelector( 'folder' );
//
//     toggleEditModeClass( elementParent );
//
//     contextMenu.style.cssText = `top: ${ yPos }px; left: ${ xPos }px; display: flex`;
//
//     fileAdding.style.display = 'block';
//     folderAdding.style.display = 'block';
//
//     if ( type === 'file' ) {
//         fileAdding.style.display = 'none';
//         folderAdding.style.display = 'none';
//     }
//
//     contextMenu.setAttribute( 'data-id', elementId );
//     contextMenu.querySelector( 'rename' ).innerHTML = `Rename ${ type }`;
//     contextMenu.querySelector( 'delete' ).innerHTML = `Delete ${ type }`;
// };
//
// // close context menu
// const destroyContextMenu = () => {
//     asideWrapper.removeEventListener( 'contextmenu', () => {} );
//     contextMenu.style.display = 'none';
// };
//
// asideWrapper click (main parent of elements)
asideWrapper.addEventListener( 'click', e => {
    const target = e.target;
    const parent = target.parentNode;
    // open folder
    console.log( target.tagName );
    if ( target.tagName === 'EX-INFO' && target.getAttribute( 'data-type' ) === 'folder' ) {
        target.nextElementSibling.classList.toggle( 'open' );
    }
    // refactor items
    // if ( parent.classList.contains( 'refactor-asideWrapper' ) ) {
    //     const elementId = asideWrapper.querySelector( '.edit-mode' ).getAttribute( 'data-id' );
    //     const inputWithNewTitle = parent.querySelector( 'input' );
    //     const newTitle = inputWithNewTitle.value.trim();
    //     // save new title
    //     if ( target.classList.contains( 'save-rename-asideWrapper-mode' ) ) {
    //         changeElementTitle( elementId, newTitle );
    //     }
    //     // save new folder or file
    //     if ( target.classList.contains( 'save-create-asideWrapper-mode' ) ) {
    //         const elementType = parent.getAttribute( 'data-type' );
    //
    //         if ( elementType === 'file' && newTitle.indexOf( '.' ) < 0 ) {
    //             inputWithNewTitle.style.border = '1px solid red';
    //             return;
    //         }
    //
    //         addNewElementInFolder( elementId, elementType, newTitle );
    //     }
    //     if ( target.classList.contains( 'cancel-mode' ) ) {
    //         removeRefactorBlock();
    //     }
    // }

} );

mainWrapper.addEventListener( 'dblclick', ( e ) => {
    const t = e.target;

    if ( t.tagName === 'EX-LINE' ) {
        if ( attr( t, 'data-type' ) === 'folder' ) {
            createMainList( attr( t, 'data-id' ) );
            disableAllMenu();
        }
    }
} );
mainWrapper.addEventListener( 'click', ( e ) => {
    const t = e.target;

    if ( t.tagName === 'EX-LINE' ) {
        const childs = siblings( t.parentNode );
        childs.forEach( el => el.classList.remove( 'target' ) );
        t.classList.add( 'target' );
        typeOfDisableMenu( t );
    }
} );

controlsWrapper.addEventListener( 'click', ( e ) => {
    const t = e.target;

    if ( attr( t, 'data-type' ) === 'explorer-up' && !t.classList.contains( 'disabled' ) ) {
        let id = attr( mainWrapper.children[ 0 ], 'data-id' );
        id = id.substring( 0, id.length - 2 );
        createMainList( id );
        return;
    }

    const activeElement = mainWrapper.querySelector( 'ex-line.target' );
    const isFFDP = attr( t, 'data-type' ) === 'file' || attr( t, 'data-type' ) === 'folder' || attr( t, 'data-type' ) === 'delete' || attr( t, 'data-type' ) === 'password';
    const isEdit = attr( t, 'data-type' ) === 'edit';

    if ( isFFDP ) {
        modalHandle( attr( t, 'data-type' ), attr( activeElement, 'data-id' ) ).open();
    }

    if ( isEdit ) {
        const name = activeElement.querySelector( 'ex-logo' ).innerText;
        modalHandle( attr( t, 'data-type' ), attr( activeElement, 'data-id' ), name ).open();
    }

} );

modalBlock.querySelector( '#ex-cancel' ).addEventListener( 'click', modalHandle().close );

modalBlock.querySelector( '#ex-save' ).addEventListener( 'click', function () {
    const type = attr( this, 'data-type' );
    const id = attr( this, 'data-id' );

    if ( modalHandle( type ).validateModal() ) {
        if ( type === 'file' || type === 'folder' ) {
            const name = modalBlock.querySelector( '#first-input' ).value;
            addNewElementInFolder( id, type, name );
        }

        modalHandle().close();
    }
} );
//
// // context menu click
// contextMenu.addEventListener( 'click', ( e ) => {
//     const target = e.target;
//     const tagName = target.tagName;
//     const editElement = asideWrapper.querySelector( '.edit-mode' );
//     const elementId = editElement.getAttribute( 'data-id' );
//     const wrapperForRename = editElement.querySelector( '.title' );
//     const wrapperForAdding = editElement.querySelector( 'ul' );
//
//     // rename file or folder
//     if ( tagName === 'RENAME' ) {
//         createRefactorBlock( wrapperForRename, wrapperForRename.innerText, 'rename-asideWrapper' );
//     }
//     // delete file or folder
//     if ( tagName === 'DELETE' ) {
//         createConfirmationBlock( target );
//     }
//     // delete confirmation
//     if ( target.classList.contains( 'yes' ) ) {
//         removeElement( elementId );
//     }
//     // add new file or folder
//     if ( tagName === 'FILE' || tagName === 'FOLDER' ) {
//         removeRefactorBlock();
//         createRefactorBlock( wrapperForAdding, tagName, 'create-asideWrapper' );
//     }
// } );
//
// // close the elements when clicked outside of them
// document.addEventListener( 'click', e => {
//     const target = e.target;
//     const isTitle = target.classList.contains( 'title' );
//     const isControlWrapper = target === contextMenu;
//     const isDeleteWrapper = target === contextMenu.querySelector( 'delete' );
//     // close context menu
//     if ( !isTitle && !isControlWrapper && !isDeleteWrapper ) {
//         destroyContextMenu();
//     }
// } );
//
// // add custom context menu
// asideWrapper.addEventListener( 'contextmenu', e => {
//     const target = e.target;
//     e.preventDefault();
//
//     if ( target.classList.contains( 'file__title' ) ) {
//         showContextMenu( target, e.pageY, e.pageX, 'file' );
//     }
//     if ( target.classList.contains( 'folder__title' ) ) {
//         showContextMenu( target, e.pageY, e.pageX, 'folder' );
//     }
// } );
