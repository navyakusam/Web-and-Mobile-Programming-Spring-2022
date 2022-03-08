import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-recipes',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.css'],
})
export class SearchRecipeComponent implements OnInit {
  public itemName: string;
  public recipesList = [];
  public restaurants = [];
  public cityName = '';
  private APP_ID = environment.APP_ID;
  private APP_KEY = environment.APP_KEY;
  private food_url = `https://api.edamam.com/search?app_id=${this.APP_ID}&app_key=${this.APP_KEY}`;

  private CLIENT_ID = environment.CLIENT_ID;
  private CLIENT_SECRET = environment.CLIENT_SECRET_KEY;
  private place_url = `https://api.foursquare.com/v3/places/search?`;


  constructor(private http: HttpClient) {}

  ngOnInit() {}

  getRecipeDetails() {
    this.restaurants = [];
    this.http.get(this.food_url + `&q=${this.itemName}`).subscribe((data) => {
    const recipes = data['hits'];
      console.log(recipes);
      recipes.map(recipe => {
        console.log(recipe);
        const recipeObj = {
          name : recipe['recipe']['label'],
          url : recipe['recipe']['url'],
          icon : recipe['recipe']['image'],
          ingredients: recipe['recipe']['ingredientLines'].slice(0, 4)
        };
        this.recipesList.push(recipeObj);
      });
    });
    let headers = {
      'Accept': 'application/json',
      'Authorization': 'APIKEY'
    }

    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'fsq3BINEqdwRMS3V/GXwHJoHxjTlts5kXnHZvpanNKNqRh0='
      }
    };
    this.http.get(this.place_url + `near=${this.cityName}&query=${this.itemName}`,options)
        .subscribe((data) => {
          console.log(data);
        const response = data['results'];
        const items = response.slice(0, 15);
        items.map((item) => {
          const venueObj = {
            id: item['fsq_id'],
            name: item['name'],
            address: {
              street: item['location']['address'],
              city: item['location']['city'],
              state: item['location']['state'],
              postalCode: item['location']['postalCode'],
              country: item['location']['country'],
              formatted_address: item['location']['formatted_address']
            },
            currentLat : item['geocodes']['main']['latitude'],
            currentLong : item['geocodes']['main']['longitude'],

            category: item['categories'][0]['name']
          };
          this.restaurants.push(venueObj);

          console.log(item);
        });
      });
  }
}
