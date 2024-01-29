#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
RUN apt-get update -yq \
	&& apt-get install curl gnupg -yq \
	&& apt-get update \
	&& apt-get install libgdiplus build-essential -yq \
	&& sed -i'.bak' 's/$/ contrib/' /etc/apt/sources.list \
	&& apt-get update \
	&& apt-get install ttf-mscorefonts-installer fontconfig -yq

WORKDIR /app
ENV ASPNETCORE_URLS http://+:5000
EXPOSE 5000

ENV MysqlDatabase="auth_db"
ENV MysqlHost="host.docker.internal"
ENV MysqlPort=3306
ENV MysqlUser="auth_db_user"
ENV MysqlPassword="2GWhZrq4zJPspWUNYvADJJWv"

ENV JWTSecret="qFNE3UDx3PFkLAYjkfTaD3JSw7uT9rrkevpm9sMLg5F7zhcKdFpVpgbxJvDYhepG"
ENV JWTAccessTokenLifetimeMinutes=180
ENV JWTRefreshTokenLifetimeDays=30
ENV JWTIssuer="stopbattle"
ENV JWTSubscriber="volunteer"
ENV JWTSessionMaxLifetimeDays=30

ENV ASPNETCORE_ENVIRONMENT=Production
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
RUN apt-get update -yq \
	&& apt-get install curl gnupg -yq \
	&& apt-get update \
	&& apt-get install libgdiplus build-essential -yq \
	&& sed -i'.bak' 's/$/ contrib/' /etc/apt/sources.list \
	&& apt-get update \
	&& apt-get install ttf-mscorefonts-installer fontconfig -yq
WORKDIR /src
COPY ["AuthBoard.csproj", ""]
RUN dotnet restore "./AuthBoard.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "AuthBoard.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "AuthBoard.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AuthBoard.dll"]