import grapesjs from 'grapesjs';
import loadComponents from './components';
import loadBlocks from './blocks';

export default grapesjs.plugins.add('dnd_plugin', (editor, opts = {}) => {
  const options = {
    blocks: ['column1', 'column2', 'column3', 'column3-7', 'text', 'link', 'image', 'video', 'map', 'h1-block', 'h2-block', 'h3-block', 'h4-block', 'html-code', 'text-sect', 'quote', 'link-block', 'grid-items', 'list-items', 'divider'],
    flexGrid: 0,
    stylePrefix: 'gjs-',
    addBasicStyle: true,
    category: 'Basic',
    labelColumn1: '1 Column',
    labelColumn2: '2 Columns',
    labelColumn3: '3 Columns',
    labelColumn37: '2 Columns 3/7',
    labelText: 'Text',
    labelLink: 'Link',
    labelImage: 'Image',
    labelVideo: 'Video',
    labelMap: 'Map',
    labelHead1: 'Heading 1',
    labelHead2: 'Heading 2',
    labelHead3: 'Heading 3',
    labelHead4: 'Heading 4',
    labelHtml: 'Html-Code',
    labelTextSection: 'Text-Section',
    labelQuote: 'Quote',
    labelLinkBlock: 'Link Block',
    labelGridItems: 'Grid Items',
    labelListItems: 'List Items',
    labelDivider: 'Divider',
    ...opts
  };

  // Add components
  loadComponents(editor, options);

  // Add blocks
  loadBlocks(editor, options);
  //accordian style
  const categories = editor.BlockManager.getCategories();
  categories.each(category => {
  	category.set('open', false).on('change:open', opened => {
  		opened.get('open') && categories.each(category => {
              category !== opened && category.set('open', false)
          })
  	})
  })

  // TODO Remove
  editor.on('load', () => editor.addComponents(`<div style="margin:100px; padding:25px;">Content loaded from the plugin</div>`, { at: 0 }))
});
