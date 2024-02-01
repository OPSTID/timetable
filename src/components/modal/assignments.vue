<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Assignments</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <IonGrid fixed>
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">
              <span class="timetable-gradient-text">Assignments</span>
            </ion-title>
          </ion-toolbar>
        </ion-header>

        <ExploreContainer name="Tab 2 page" />
      </IonGrid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid } from '@ionic/vue';
import { useHead } from "@unhead/vue"

</script>
