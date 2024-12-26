async function globalSetup() {
    await new Promise(resolve => 
        setTimeout(resolve, Math.random() * 10000)
    );
}

export default globalSetup; 