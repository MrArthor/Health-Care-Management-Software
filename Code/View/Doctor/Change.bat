@ECHO OFF
PUSHD .
FOR /R %%d IN (.) DO (
cd "%%d"
IF EXIST *----[HOWTOFREE.ORG]--- (
REN *----[HOWTOFREE.ORG]--- *
)
)
POPD