
function idconnectionBdd() {
const supabaseUrl = "https://gbzuyeeftpaxcoxxncbp.supabase.co";
const supabaseKey = "sb_publishable_PZ08OsfCCPjTASB7qzjphA_AEXPi9DM";

const supabase = createClient(supabaseUrl, supabaseKey);
console.log("supabase:", supabase);
if (!supabase) {
  console.error("Erreur de connexion à la BDD Supabase.");
  return null;
}
console.log("Connexion à la BDD Supabase établie.");

return supabase;
}

function handleLogin(login, password) {
  const supabase = idconnectionBdd();
  return supabase
    .from('users')
    .select('*')
    .eq('login', login)
    .eq('password', password);
}
function handleRegister(login, password) {
  const supabase = idconnectionBdd();
  return supabase
    .from('users')
    .insert([{ login: login, email: email, password: password }]);
}

export { handleLogin, handleRegister };