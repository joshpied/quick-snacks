import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';

import SidebarItemComponent from '../SidebarItem/SidebarItem';

class SidebarComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      addingRecipe: false,
      title: null
    };
  }

  render() {
    const { recipes, selectedRecipeIndex, classes } = this.props;

    if (recipes) {
      return (
        <div className={classes.sidebarContainer}>
          <Button
            onClick={this.newRecipeBtnClick}
            className={classes.newRecipeBtn}
          >
            {this.state.addingRecipe ? 'Cancel' : '+ New Recipe'}
          </Button>
          {this.state.addingRecipe ? (
            <div>
              <input
                type="text"
                className={classes.newRecipeInput}
                placeholder="Enter recipe title"
                onKeyUp={e => this.updateTitle(e.target.value)}
              ></input>
              <Button
                className={classes.newRecipeSubmitBtn}
                onClick={this.newRecipe}
              >
                Add Recipe
              </Button>
            </div>
          ) : null}
          <List>
            {recipes.map((recipe, index) => {
              return (
                <div key={index}>
                  <SidebarItemComponent
                    recipe={recipe}
                    index={index}
                    selectedRecipeIndex={selectedRecipeIndex}
                    selectRecipe={this.selectRecipe}
                    deleteRecipe={this.deleteRecipe}
                  ></SidebarItemComponent>
                  <Divider></Divider>
                </div>
              );
            })}
          </List>
        </div>
      );
    } else {
      // change this to say loading recipes or a loading bar
      return <div></div>;
    }
  }

  newRecipeBtnClick = () => {
    this.setState({ title: null, addingRecipe: !this.state.addingRecipe });
  };

  updateTitle = text => {
    this.setState({ title: text });
  };

  newRecipe = () => {
    this.props.addRecipe(this.state.title);
    this.setState({ title: null, addingRecipe: false });
  };

  selectRecipe = (recipe, index) => this.props.selectRecipe(recipe, index);

  deleteRecipe = recipe => this.props.deleteRecipe(recipe);
}

export default withStyles(styles)(SidebarComponent);
