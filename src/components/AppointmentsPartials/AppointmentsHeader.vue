<template>
  <div class="py-8">
    <div class="flex flex-1 -space-x-2 items-center justify-start">
      <AgentAvatar
          v-for="agent in agents.slice(0, 5)"
          :key="agent.id"
          :name="`${agent.fields.agent_name} ${agent.fields.agent_surname}`"
          :bgColor="agent.fields.color"

      />
      <AgentAvatar :name="agents.length - 5" v-if="agents.length > 5"/>
    </div>
  </div>
</template>

<script setup>
import AgentAvatar from "@/components/AgentAvatar.vue";

defineProps({
  agents: {
    type: Array,
    required: true
  }
});
</script>

<style scoped></style>
