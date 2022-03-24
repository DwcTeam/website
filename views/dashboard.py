from flask import Blueprint, render_template, current_app as app, session, abort
from utlits import login_required, Auth, get_guild, is_admin, check_guilds
from utlits.objects import convert_data_user

dashboard = Blueprint('dashboard', __name__, url_prefix='/dashboard')

auth: Auth = app.auth


@dashboard.route('/')
@login_required
def index_page():
    user = convert_data_user(app.logins.find_one({"token.access_token": session["token"]}))
    guilds = user.guilds()
    alive_guilds = check_guilds(guilds)  # send to cache bot to know if guild is alive
    available_guilds = [i for i in guilds if i.id in alive_guilds]
    unavailable_guilds = [i for i in guilds if i.id not in alive_guilds]
    return render_template(
        'dashboard.html', available_guilds=available_guilds, unavailable_guilds=unavailable_guilds,
        title="لوحة التحكم", user=user, is_admin=is_admin(user.id)
    )

@dashboard.route('/<int:guild_id>')
@login_required
def guild_page(guild_id):
    user = convert_data_user(app.logins.find_one({"token.access_token": session["token"]}))
    user_guild = user.get_guild(guild_id)
    # if guild is missing
    if not user_guild:
        return abort(403)
    info = app.db.find_one({"_id": guild_id})  # get guild info form database
    if not info:
        info = {
            "_id": guild_id,
            "prefix": "!",
            "channel": None,
            "time": 1800,
            "anti_spam": False,
            "embed": False,
            "role_id": None
        }
        app.db.insert_one(info)
    guild = get_guild(guild_id)
    text_channels = [i for i in guild.channels if i.type == 0]
    voice_channels = [i for i in guild.channels if i.type == 2]
    return render_template(
        'guild.html', guild=user_guild, info=info, text_channels=text_channels, 
        voice_channels=voice_channels, roles=guild.roles,
        title=f"{user_guild.name} | لوحة التحكم", user=user, is_admin=is_admin(user.id)
    )

