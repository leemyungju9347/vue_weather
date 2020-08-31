function inputValidation(cityName) {
  const eng = /^[a-zA-Z]*$/;
  return eng.test(cityName);
}

export { inputValidation };
