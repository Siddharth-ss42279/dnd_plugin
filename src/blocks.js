export default (editor, config = {}) => {
  const bm = editor.BlockManager;
  // ...
  //h1
  bm.add('h1-block', {
    label: 'Heading 1',
    content: '<h1>HEADING 1</h1>',
    category: 'Heading',
    attributes: {
      title: 'Insert h1 block',
      class: 'fa fa-header'
    }
  });

  //h2
  bm.add('h2-block', {
    label: 'Heading 2',
    content: '<h2>HEADING 2</h2>',
    category: 'Heading',
    attributes: {
      title: 'Insert h2 block',
      class: 'fa fa-header'
    }
  });

  //h3
  bm.add('h3-block', {
    label: 'Heading 3',
    content: '<h3>HEADING 3</h3>',
    category: 'Heading',
    attributes: {
      title: 'Insert h3 block',
      class: 'fa fa-header'
    }
  });

  //h4
  bm.add('h4-block', {
    label: 'Heading 4',
    content: '<h4>HEADING 4</h4>',
    category: 'Heading',
    attributes: {
      title: 'Insert h4 block',
      class: 'fa fa-header'
    }
  });
}
