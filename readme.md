# Laravue Paginator

 [![npm](https://img.shields.io/npm/v/laravue-paginator.svg)](https://www.npmjs.com/package/laravue-paginator)
 [![npm](https://img.shields.io/npm/dt/laravue-paginator.svg)](https://github.com/ryanwinchester/laravue-paginator)

Bootstrap styled paginator Vue component for Laravel pagination

### Install

```
yarn add laravue-paginator
```

### Usage

```vue
<template>
  <div>

    <template v-f="dogs.length > 0">
      <table class="table table-striped">
        <thead>
          <th>Breed</th>
          <th>Age</th>
          <th>Sex</th>
        </thead>
        <tbody>
          <template v-for="dog in dogs">
            <tr :key="dog.id">
              <td>{{ dog.breed }}</td>
              <td>{{ dog.age }}</td>
              <td>{{ dog.sex }}</td>
            </tr>
          </template>
        </tbody>
      </table>

      <laravue-paginator v-if="pagination"
        :pagination="pagination"
        :plus-min-range="2"
        change-event="page:updated"
        :event-emitter="eventHub"
      ></laravue-paginator>

    </template>

    <h4 v-else>No dogs :(</h4>

  </div>
</template>

<script>
  import LaravuePaginator from 'laravue-paginator'

  export default {
    components: {LaravuePaginator},

    data() {
      return {
        eventHub,
        dogs: [],
        pagination: null
      }
    },

    created() {
      this.fetch_dogs()

      this.eventHub.$on('page:updated', (event) => {
        this.fetch_dogs(event.page)
      })
    },

    computed: {
      req_params() {
        page: this.pagination.current_page,
        perPage: this.pagination.per_page,
      }
    },

    methods: {
      fetch_dogs(page = 1) {
        const params = Object.assign(this.req_params, {page})
        axios.get('/api/dogs', {params})
          .then(this.map_response_data)
          .catch((err) => {console.error(err)})
      },
      map_response_data({data: {data, ...pagination}}) {
        this.dogs = data
        this.pagination = pagination
      }
    }

  }
</script>
```

#### Props

- `pagination`: (required) The JSON version of Laravel pagination parameters.
- `plus-min-range`: (optional) The number of pages to show on each side of the current. defaults to `2`
- `change-event`: (optional) The name of the event to emit on page change. Defaults to `page:updated`
- `event-emitter`: (optional) the even emitter object (vue instance). Defaults to `eventHub`


`pagination` object should contain at least these properties:

```js
{
  current_page: 1,
  last_page: 2,
  per_page: 5,
  from: 1,
  to: 5,
  total: 9
}
```
