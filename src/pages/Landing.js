import React from 'react';

class Landing extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedRecipeIndex: null,
      selectedRecipe: null,
      recipes: null
    };
  }

  render() {
    return <h1>Landing</h1>;
  }
}
export default Landing;
