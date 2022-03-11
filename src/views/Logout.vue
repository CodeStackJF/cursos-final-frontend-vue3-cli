<template>
  <div></div>
</template>

<script>
    export default{
        name: 'Logout',
        async created()
        {
            localStorage.removeItem('token');
            localStorage.removeItem('autenticado');
            this.$router.push('/Login');
        }
    }
</script>