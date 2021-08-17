// // global variables
// const wrapper = document.querySelector( '.wrapper' );
// const contextMenu = document.querySelector( 'context-menu' );
//
// // data[]
// const list = [
//     {
//         id: 1,
//         type: 'folder',
//         title: 'exportportal',
//         children: [
//             {
//                 id: 11,
//                 type: 'file',
//                 title: 'index.html'
//             },
//             // {
//             //     id: 12,
//             //     type: 'folder',
//             //     title: 'css',
//             //     children: [
//             //         {
//             //             id: 121,
//             //             type: 'file',
//             //             title: 'style.css'
//             //         }
//             //     ]
//             // },
//             // {
//             //     id: 13,
//             //     type: 'folder',
//             //     title: 'js',
//             //     children: [
//             //         {
//             //             id: 131,
//             //             type: 'file',
//             //             title: 'app.js'
//             //         },
//             //         {
//             //             id: 132,
//             //             type: 'folder',
//             //             title: 'vendors',
//             //             children: [
//             //                 {
//             //                     id: 1321,
//             //                     type: 'file',
//             //                     title: 'swiper.js'
//             //                 },
//             //                 {
//             //                     id: 1322,
//             //                     type: 'file',
//             //                     title: 'fancybox.js'
//             //                 }
//             //             ]
//             //         }
//             //     ]
//             // },
//             // {
//             //     id: 14,
//             //     type: 'folder',
//             //     title: 'fonts',
//             //     children: [
//             //         {
//             //             id: 141,
//             //             type: 'file',
//             //             title: 'icomoon.svg'
//             //         }
//             //     ]
//             // }
//         ]
//     }
// ];
// window.list = list;
// // create explorer from list[]
// const createList = ( parent = wrapper, array = list ) => {
//     parent.innerHTML = ``;
//     array.forEach( function ( o ) {
//         const li = document.createElement( 'li' ),
//             ul = document.createElement( 'ul' ),
//             span = document.createElement( 'span' ),
//             div = document.createElement( 'div' );
//
//         div.textContent = o.title;
//         div.classList.add( 'title' );
//         li.setAttribute( 'data-id', o.id );
//
//         if ( o.type === 'file' ) {
//             li.classList.add( 'file' );
//             div.classList.add( 'file__title' );
//         }
//
//         parent.appendChild( li );
//         li.appendChild( div );
//
//         if ( o.children ) {
//             li.classList.add( 'folder', 'open' );
//             div.classList.add( 'folder__title' );
//             span.classList.add( 'arrow' );
//             li.appendChild( span );
//             li.appendChild( ul );
//             createList( ul, o.children );
//         }
//     } );
// };
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
//     createList();
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
//     wrapper.querySelectorAll( '.edit-mode' ).forEach( elem => {
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
//     const wrapper = document.createElement( 'div' );
//     const input = document.createElement( 'input' );
//     const btnSave = document.createElement( 'button' );
//     const btnCancel = document.createElement( 'button' );
//
//
//     if ( typeOfCreateElement === 'rename-wrapper' ) {
//         input.value = value.trim();
//     }
//     if ( typeOfCreateElement === 'create-wrapper' ) {
//         wrapper.setAttribute( 'data-type', value.toLowerCase() );
//     }
//     btnSave.innerText = 'Save';
//     btnCancel.innerText = 'Cancel';
//     btnSave.classList.add( `save-${ typeOfCreateElement }-mode` );
//     btnCancel.classList.add( `cancel-mode` );
//
//     wrapper.classList.add( typeOfCreateElement, 'refactor-wrapper' );
//
//     wrapper.appendChild( input );
//     wrapper.appendChild( btnSave );
//     wrapper.appendChild( btnCancel );
//     container.prepend( wrapper );
//
//     input.focus();
// };
// // remove refactor block
// const removeRefactorBlock = () => {
//     wrapper.querySelectorAll( '.refactor-wrapper' ).forEach( block => {
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
//     wrapper.removeEventListener( 'contextmenu', () => {} );
//     contextMenu.style.display = 'none';
// };
//
// // wrapper click (main parent of elements)
// wrapper.addEventListener( 'click', e => {
//     const target = e.target;
//     const parent = target.parentNode;
//     // open folder
//     if ( target.classList.contains( 'arrow' ) ) {
//         parent.querySelectorAll( '.open' ).forEach( el => {el.classList.remove( 'open' );} );
//         parent.classList.toggle( 'open' );
//     }
//     // refactor items
//     if ( parent.classList.contains( 'refactor-wrapper' ) ) {
//         const elementId = wrapper.querySelector( '.edit-mode' ).getAttribute( 'data-id' );
//         const inputWithNewTitle = parent.querySelector( 'input' );
//         const newTitle = inputWithNewTitle.value.trim();
//         // save new title
//         if ( target.classList.contains( 'save-rename-wrapper-mode' ) ) {
//             changeElementTitle( elementId, newTitle );
//         }
//         // save new folder or file
//         if ( target.classList.contains( 'save-create-wrapper-mode' ) ) {
//             const elementType = parent.getAttribute( 'data-type' );
//
//             if ( elementType === 'file' && newTitle.indexOf( '.' ) < 0 ) {
//                 inputWithNewTitle.style.border = '1px solid red';
//                 return;
//             }
//
//             addNewElementInFolder( elementId, elementType, newTitle );
//         }
//         if ( target.classList.contains( 'cancel-mode' ) ) {
//             removeRefactorBlock();
//         }
//     }
//
// } );
//
// // context menu click
// contextMenu.addEventListener( 'click', ( e ) => {
//     const target = e.target;
//     const tagName = target.tagName;
//     const editElement = wrapper.querySelector( '.edit-mode' );
//     const elementId = editElement.getAttribute( 'data-id' );
//     const wrapperForRename = editElement.querySelector( '.title' );
//     const wrapperForAdding = editElement.querySelector( 'ul' );
//
//     // rename file or folder
//     if ( tagName === 'RENAME' ) {
//         createRefactorBlock( wrapperForRename, wrapperForRename.innerText, 'rename-wrapper' );
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
//         createRefactorBlock( wrapperForAdding, tagName, 'create-wrapper' );
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
// wrapper.addEventListener( 'contextmenu', e => {
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
