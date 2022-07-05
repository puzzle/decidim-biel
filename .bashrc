alias vim="vim.tiny"
export PATH="${HOME}/bin:${PATH}"
export EDITOR="vim"

if [[ $SENTRY_CURRENT_ENV == "production" ]]; then
  export PS1="\[\033[01;31m\]STBI-PROD\[\033[00m\] \w> "
elif [[ $SENTRY_CURRENT_ENV == "integration" ]]; then
  export PS1="\[\033[01;33m\]STBI-INT\[\033[00m\] \w> "
else
  export PS1="\[\033[01;32m\]STBI-DEV\[\033[00m\] \w> "
fi

