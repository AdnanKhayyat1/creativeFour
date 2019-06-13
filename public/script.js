var app = new Vue({
    el: '#root',
    data: {
        name: "",
        phone: "",
        email: "",
        description: "",
        // findTitle: "",
        findItem: null,
        addItem: null,
        relation: ['Friend', 'Family', 'Work', 'Services', 'Other'],
        items: [],
    },
    created() {
        this.getItems();
      },
    methods: {
        async addNewItem(){
            try {

              let result = await axios.post('/api/items', {
                name: this.name,
                phone: this.phone,
                email: this.email,
                // description: this.description
              });

              this.addItem = result.data;
            } catch (error) {
              console.log(error);
            }
          },
          async getItems() {
            try {
              let response = await axios.get("/api/items");
              this.items = response.data;
              return true;
            } catch (error) {
              console.log(error);
            }
          },
          selectItem(item) {
            this.findItem = item;
          },
          async deleteItem(item) {
            try {
              let response = await axios.delete("/api/items/" + item.id);
            //   this.findItem = null;
              this.getItems();
              return true;
            } catch (error) {
              console.log(error);
            }
          },
          async editItem() {
            try {
                
            
              let response = await axios.put("/api/items/" + this.findItem.id, {
                name: this.findItem.name,
                phone: this.findItem.phone,
                email: this.findItem.email
              });
              this.findItem = null;
              this.getItems();
              return true;
            } catch (error) {
              console.log(error);
            }
          },
    },
   
});