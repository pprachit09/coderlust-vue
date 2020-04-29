<template>
  <q-page class="q-pa-md">
    <div class="q-pa-md" style="max-width: 350px">
      <q-list separator bordered>
        <q-item 
          v-for="task in tasks"
          :key="task.id"
          @click="task.completed = !task.completed"
          :class="!task.completed ? 'bg-deep-orange-2' : 'bg-lime-2' "
          clickable
          v-ripple>
            <q-item-section side top>
              <q-checkbox v-model="task.completed" />
            </q-item-section>

            <q-item-section>
              <q-item-label
                :class="{ 'text-strikethrough' : task.completed }">
                  {{ task.name }}
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <div class="row">
                <div class="column justify-center">
                  <q-icon 
                    name="event"
                    size="20px"
                    class="q-mr-xs" />
                </div>
                
                <div class="column">
                  <q-item-label 
                    class="row justify-end"
                    caption>
                      {{ task.dueDate }}
                  </q-item-label>
                  <q-item-label 
                    class="row justify-end"
                    caption>
                      <small>{{ task.dueTime }}</small>
                  </q-item-label>
                </div>
              </div>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
  export default {
    data() {
      return {
        tasks: [
          {
            id: 1,
            name: 'Learn Vue js',
            completed: false,
            dueDate: '2020-05-12',
            dueTime: '12:30'
          },
          {
            id: 2,
            name: 'Deploy Vue app',
            completed: false,
            dueDate: '2020-05-15',
            dueTime: '18:30'
          },
          {
            id: 3,
            name: 'Go to sleep',
            completed: false,
            dueDate: '2020-05-14',
            dueTime: '14:30'            
          }
        ]
      }
    }
  }
</script>

<style>

</style>
