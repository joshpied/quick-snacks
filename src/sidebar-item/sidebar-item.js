import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../helpers';

class SidebarItemComponent extends React.Component {
  render() {
    const { index, recipe, selectedRecipeIndex, classes } = this.props;
    return (
      <div key={index}>
        <ListItem
          className={classes.listItem}
          selected={selectedRecipeIndex === index}
          alignItems="flex-start"
          onClick={() => this.selectRecipe(recipe, index)}
        >
          <div
            className={classes.textSection}
          >
            <ListItemText
              primary={recipe.title}
              secondary={removeHTMLTags(recipe.body.substring(0, 30)) + '...'}
            ></ListItemText>
          </div>
          <DeleteIcon
            onClick={() => this.deleteRecipe(recipe)}
            className={classes.deleteIcon}
          ></DeleteIcon>
        </ListItem>
      </div>
    );
  }

  selectRecipe = (recipe, index) => this.props.selectRecipe(recipe, index);

  deleteRecipe = recipe => {
    if (window.confirm(`Are you sure you want to delete ${recipe.title}?`)) {
      this.props.deleteRecipe(recipe);
    }
  };
}

export default withStyles(styles)(SidebarItemComponent);
