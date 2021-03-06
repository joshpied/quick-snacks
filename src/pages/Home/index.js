import React from 'react';
import SidebarComponent from './Sidebar/Sidebar';
import EditorComponent from './Editor/Editor';
import './Home.css';
import 'react-quill/dist/quill.snow.css';
import firebase from 'firebase';
import { AuthUserContext, withAuthorization } from '../../components/Session';

const DEFAULT_RECIPE_BODY =
  '<h1>Ingredients</h1><ul><li>Item</li></ul><h1>Instructions</h1><ol><li>Step</li></ol>';

class Home extends React.Component {
  static contextType = AuthUserContext;

  constructor(props) {
    super(props);
    this.state = {
      selectedRecipeIndex: null,
      selectedRecipe: null,
      recipes: null
    };
  }

  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div className="app-container">
            <SidebarComponent
              selectedRecipeIndex={this.state.selectedRecipeIndex}
              recipes={this.state.recipes}
              deleteRecipe={this.deleteRecipe}
              selectRecipe={this.selectRecipe}
              addRecipe={this.addRecipe}
            ></SidebarComponent>
            {this.state.selectedRecipe ? (
              <EditorComponent
                selectedRecipe={this.state.selectedRecipe}
                selectedRecipeIndex={this.state.selectedRecipeIndex}
                updateRecipe={this.updateRecipe}
                recipes={this.state.recipes}
              ></EditorComponent>
            ) : (
              <div className="no-selected-recipe-message">
                <h2 className="text-primary">Select a recipe!</h2>
              </div>
            )}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }

  componentDidMount = () => {
    this.props.firebase.recipes(this.context.uid).onSnapshot(serverUpdate => {
      const recipes = serverUpdate.docs.map(_doc => {
        const data = _doc.data();
        data['id'] = _doc.id;
        return data;
      });
      console.log(recipes);
      this.setState({ recipes: recipes });
    });
  };

  // componentWillMount = () => {
  //   this.listener();
  // };

  selectRecipe = (recipe, index) =>
    this.setState({ selectedRecipeIndex: index, selectedRecipe: recipe });

  updateRecipe = (id, recipeObj) => {
    // make sure element being updated is still in the array of recipes
    if (this.state.recipes.some(recipe => recipe.id === id)) {
      this.props.firebase.recipe(id).update({
        title: recipeObj.title,
        body: recipeObj.body,
        dateUpdated: this.props.firebase.fieldValue.serverTimestamp() //firebase.firestore.FieldValue.serverTimestamp()
      });
    }
  };

  addRecipe = async title => {
    // init new recipe
    const recipe = {
      title: title,
      body: DEFAULT_RECIPE_BODY,
      userId: this.context.uid,
      dateCreated: this.props.firebase.fieldValue.serverTimestamp(), //firebase.firestore.FieldValue.serverTimestamp(),
      dateUpdated: this.props.firebase.fieldValue.serverTimestamp() //firebase.firestore.FieldValue.serverTimestamp()
    };
    // add recipe to db
    const newRecipe = await firebase
      .firestore()
      .collection('recipes')
      .add({ ...recipe });
    // get id of new recipe so it can be displayed in editor
    const newId = newRecipe.id;
    // add recipe to recipes list
    await this.setState({ recipes: [...this.state.recipes, recipe] });
    // get index of new recipe (will be array of one) to show in editor
    const newRecipeIndex = this.state.recipes.indexOf(
      this.state.recipes.filter(recipe => recipe.id === newId)[0]
    );
    this.setState({
      selectedRecipe: this.state.recipes[newRecipeIndex],
      selectedRecipeIndex: newRecipeIndex
    });
  };

  deleteRecipe = async recipe => {
    const recipeIndex = this.state.recipes.indexOf(recipe);
    await this.setState({
      recipes: this.state.recipes.filter(_recipe => _recipe.id !== recipe.id)
    });
    // when recipe being deleted is the selected recipe remove any recipe from being selected
    if (this.state.selectedRecipeIndex === recipeIndex) {
      this.setState({ selectedRecipeIndex: null, selectedRecipe: null });
    }
    // if recipe list has more than one object
    else {
      this.state.recipes.length >= 1
        ? this.selectRecipe(
            this.state.recipes[this.state.selectedRecipeIndex - 1],
            this.state.selectedRecipeIndex - 1
          )
        : this.setState({ selectedRecipeIndex: null, selectedRecipe: null });
    }
    this.props.firebase.recipe(recipe.id).delete();
  };
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Home);
