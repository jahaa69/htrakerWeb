<template>
    <div id="cardTime">
        <h1>{{Time}}</h1>
        <p>{{Description}}</p>
        <div id="barreDeProgretion"></div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    Time: string;
    Description: string;
}>();
</script>

<style>
#cardTime {
    border-radius: 8px;
    background-color: #1E293B;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
    height: 200px;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: Arial, sans-serif;
}
#cardTime h1 {
    display: flex;
    width: 70%;
    height: 60%;
    font-size: 48px;
    justify-content: start;
    align-items: end;
}
#cardTime p {
    display: flex;
    width: 70%;
    font-size: 18px;
    justify-content: start;
    align-items: start;
    height: 20%;

}
#barreDeProgretion {
    margin-top: 20px;
    width: 100%;
    height: 10%;
    background-color: #374151;
    border-radius: 5px;
}
</style>