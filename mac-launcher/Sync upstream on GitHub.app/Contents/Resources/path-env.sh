# Finder から起動した .app は zprofile 等を読まず PATH が極端に短いことがある。
# Bun は通常 ~/.bun/bin、Homebrew は /opt/homebrew または /usr/local に置かれる。

prepend_dirs=""
for _d in "${HOME}/.bun/bin" "/opt/homebrew/bin" "/usr/local/bin" "${HOME}/.local/bin"; do
  [[ -d "${_d}" ]] && prepend_dirs="${prepend_dirs:+${prepend_dirs}:}${_d}"
done

_login_path=""
if [[ -x /bin/zsh ]]; then
  _login_path="$(/bin/zsh -l -c 'printf %s "$PATH"' 2>/dev/null || true)"
fi

export PATH="${prepend_dirs:+${prepend_dirs}:}${_login_path:+${_login_path}:}${PATH:-}"
unset _d _login_path prepend_dirs
