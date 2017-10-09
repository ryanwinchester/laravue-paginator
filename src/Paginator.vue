<template>
  <div>
      <!-- page info -->
      <div>
        Displaying results <b>{{pagination.from}}</b> to <b>{{pagination.to}}</b>
        of <b>{{pagination.total}}</b> total
        on page <b>{{pagination.current_page}}</b> of <b>{{pagination.last_page}}</b>
      </div>

      <!-- paging -->
      <nav aria-label="Page navigation">
        <ul class="pagination">

          <!-- first page button -->
          <li class="page-item" :class="{disabled: pagination.current_page == 1}">
            <a v-if="pagination.current_page != 1" href="#first" class="page-link" aria-label="First"
              @click.prevent="update_page(1)"
            ><span>&laquo;</span></a>
            <span v-else class="page-link">&laquo;</span>
          </li>

          <!-- previous page button -->
          <li class="page-item" :class="{disabled: pagination.current_page == 1}">
            <a v-if="pagination.current_page != 1" href="#previous" class="page-link" aria-label="Previous"
              @click.prevent="update_page(pagination.current_page-1)"
            ><span>&lsaquo;</span></a>
            <span v-else class="page-link">&lsaquo;</span>
          </li>

          <!-- ... -->
          <li class="page-item" v-if="min_page != 1">
            <span class="page-link" style="background-color:#fff;"><b>...</b></span>
          </li>

          <!-- page buttons -->
          <li class="page-item"
            v-for="n in max_page" v-if="n >= min_page" :key="n"
            :class="{active: pagination.current_page == n}"
          >
            <a class="page-link" :href="'#page-'+n" @click.prevent="update_page(n)" v-text="n"></a>
          </li>

          <!-- ... -->
          <li class="page-item" v-if="max_page != pagination.last_page">
            <span class="page-link" style="background-color:#fff;"><b>...</b></span>
          </li>

          <!-- next page button -->
          <li class="page-item" :class="{disabled: pagination.current_page == pagination.last_page}">
            <a v-if="pagination.current_page != pagination.last_page" href="#" class="page-link" aria-label="Next"
              @click.prevent="update_page(pagination.current_page+1)"
            ><span>&rsaquo;</span></a>
            <span v-else class="page-link">&rsaquo;</span>
          </li>

          <!-- last page button -->
          <li class="page-item" :class="{disabled: pagination.current_page == pagination.last_page}">
            <a v-if="pagination.current_page != pagination.last_page" href="#" class="page-link" aria-label="Last"
              @click.prevent="update_page(pagination.last_page)"
            ><span>&raquo;</span></a>
            <span v-else class="page-link">&raquo;</span>
          </li>

        </ul>
      </nav>

  </div>
</template>

<script>
  export default {
    props: {
      pagination: {type: Object, required: true},
      plusMinRange: {type: Number, default: 2},
      changeEvent: {type: String, default: 'page:updated'},
      eventEmitter: {type: Object, default: window.eventHub},
    },

    methods: {
      update_page(page = 1) {
        this[this.eventEmitter].$emit(this.changeEvent, {page})
      }
    },

    computed: {
      min_page() {
        switch (true) {
          case this.pagination.current_page - this.plusMinRange <= 0:
            return 1
          case this.pagination.current_page + this.plusMinRange > this.pagination.last_page:
            return this.pagination.last_page - this.plusMinRange*2
          default:
            return this.pagination.current_page - this.plusMinRange
        }
      },
      max_page() {
        switch (true) {
          case this.pagination.current_page + this.plusMinRange >= this.pagination.last_page:
            return this.pagination.last_page
          case this.pagination.current_page - this.plusMinRange <= 0:
            return this.plusMinRange*2 + 1
          default:
            return this.pagination.current_page + this.plusMinRange
        }
      }
    }

  }
</script>
