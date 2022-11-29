Shopping Page

[]Succesful authentication should redirect to the shopping page 1
[]Unauthenticated users trying to visit shopping page should be redirected to login 1
[]Users should see a list of their shopping list items 2
[]Users should be able to add an item to their shopping list 2
[]When a user clicks on an item, it should be updated to `bought=true` 2
[]When an item is bought, it should display differently on the page 2
[]Users should be able to delete all shopping list items 3

Functions
[]ASYNC `createItem(item)` -- adds a new item 1
[]ASYNC `deleteAllItems()` -- deletes all items 1
[]ASYNC `fetchItems()` -- fetches all items 1
[]ASYNC `buyItem(id)` -- udpates specific item to `bought=true` 1
[]PURE `renderItem(item)` -- takes an item object and returns a DOM element 1
[]IMPURE `displayListItems()` -- fetches the items from supabase, clears out the DOM, rerenders them 2
