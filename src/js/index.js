// Main js file
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#import-js-files

// // global variables
const asideWrapper = document.querySelector( '#aside_wrapper' );
const mainWrapper = document.querySelector( '#main_wrapper' );
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
        title: 'exportporta file',
        block: false,
        created: '18.08.2021',
    }
];
// window.list = list;
// // create explorer from list[]

const createMainList = ( parent = mainWrapper, array = list ) => {

    array.forEach( item => {
        const line = document.createElement( 'ex-line' );
        const logo = document.createElement( 'ex-logo' );

        const info = document.createElement( 'ex-info' );
        const date = document.createElement( 'ex-date' );
        const type = document.createElement( 'ex-type' );
        const block = document.createElement( 'ex-block' );


        logo.textContent = item.title;
        line.setAttribute( 'data-id', item.id );
        logo.classList.add( `icon-${item.type}` );

        date.textContent = item.created;
        type.textContent = item.type;
        block.classList.add(`icon-${item.block === true ? 'lock' : 'lock-open'}`);

        info.append(date, type, block);

        line.appendChild(logo);
        line.appendChild(info);
        parent.appendChild(line);
        if ( item.children ) {
            createMainList( parent, item.children );
        }
    } );
//    <ex-line><ex-logo class="icon-folder">Folder1</ex-logo>
// <ex-info><ex-date>02.03.2021</ex-date><ex-type>folder</ex-type><ex-block class="icon-lock"></ex-block></ex-info></ex-line>
};
const createAsideList = ( parent = asideWrapper, array = list ) => {
    // parent.innerHTML = ``;
    array.forEach( item => {
        const file = document.createElement( 'ex-file' );
        const folder = document.createElement( 'ex-folder' );
        const info = document.createElement( 'ex-info' );
        const logo = document.createElement( 'ex-logo' );
        const name = document.createElement( 'ex-name' );
        const content = document.createElement( 'ex-content' );


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

createAsideList();
createMainList();
// // sort explorer folder-first and alphabet order
// const sortExplorer = ( array = list ) => {
//     array.map( item => {
//         if ( item.children && item.children.length > 1 ) {
//             item.children.sort( ( a, b ) => {
//                 if ( a.title < b.title ) return -1;
//                 if ( a.title > b.title ) return 1;
//                 return 0;
//             } ).sort( ( a, b ) => {
//                 if ( b.type === 'folder' ) return 1;
//                 if ( a.type === 'folder' ) return -1;
//                 return 0;
//             } );
//             sortExplorer( item.children );
//         }
//     } );
// };
//
// // recreate a new list after change in list[]
// const refreshExplorerContent = () => {
//     sortExplorer( list );
//     createAsideList();
// };
// refreshExplorerContent();
// // return {element, array, index} of the element id
// const returnElemArrayIndexOfTheElementId = ( elemId ) => {
//     let currentElement = {};
//
//     const searchParentByElementId = ( searchElemId, currentArray ) => {
//         currentArray.forEach( ( item, index, arr ) => {
//             if ( item.id === elemId ) {
//                 currentElement.element = item;
//                 currentElement.array = arr;
//                 currentElement.index = index;
//             }
//             if ( item.children && item.children.length > 0 ) {
//                 searchParentByElementId( elemId, item.children );
//             }
//         } );
//     };
//
//     searchParentByElementId( elemId, list );
//
//     if ( Object.keys( currentElement ).length > 0 ) {
//         return currentElement;
//     }
// };
// // add new element in the list[]
// const addIdToNewElement = folderFiles => {
//     const allId = folderFiles.children.map( file => file.id );
//     if ( allId.length === 0 ) {
//         return +`${ folderFiles.id }1`;
//     }
//     return Math.max.apply( null, allId ) + 1;
// };
// // change element title
// const changeElementTitle = ( itemId, newTitle ) => {
//     const currentItem = returnElemArrayIndexOfTheElementId( +itemId ).element;
//     currentItem.title = newTitle;
//     refreshExplorerContent();
// };
// // add new element in list[]
// const addNewElementInFolder = ( folderId, typeOfNewElem, titleOfNewElem ) => {
//     const newItem = new Object( null );
//     const currentFolder = returnElemArrayIndexOfTheElementId( +folderId ).element;
//     // required params
//     newItem.id = addIdToNewElement( currentFolder );
//     newItem.type = typeOfNewElem;
//     newItem.title = titleOfNewElem;
//     // if folder
//     typeOfNewElem === 'folder' && (newItem.children = []);
//     // add new file in folder
//     currentFolder.children.push( newItem );
//     refreshExplorerContent();
// };
// // remove element from list[]
// const removeElement = ( elemId, array = list ) => {
//     const currentElement = returnElemArrayIndexOfTheElementId( +elemId );
//     currentElement.array.splice( currentElement.index, 1 );
//     refreshExplorerContent();
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
    if ( target.tagName === 'EX-INFO' && target.getAttribute('data-type') === 'folder' ) {
        target.nextElementSibling.classList.toggle('open');
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
